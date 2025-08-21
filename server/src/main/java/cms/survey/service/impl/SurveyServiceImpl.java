package cms.survey.service.impl;

import cms.survey.domain.*;
import cms.survey.dto.DraftCreateRequestDto;
import cms.survey.dto.RegistrationListItemDto;
import cms.survey.dto.SubmitRequestDto;
import cms.survey.repository.*;
import cms.survey.service.SurveyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService {

        private final PersonRepository personRepository;
        private final IntakeRequestRepository intakeRequestRepository;
        private final SurveyRepository surveyRepository;
        private final SurveyRegistrationRepository registrationRepository;
        private final SurveyResponseRepository responseRepository;
        private final SurveyResultRepository resultRepository;

        @Override
        @Transactional
        public Long createDraft(DraftCreateRequestDto request) {
                // 1) upsert person by studentNumber (옵션), 없으면 신규
                Person person = Optional.ofNullable(request.getStudentNumber())
                                .flatMap(personRepository::findByStudentNumber)
                                .orElseGet(() -> Person.builder().build());
                person.setStudentNumber(request.getStudentNumber());
                person.setFullName(request.getFullName());
                person.setGenderCode(request.getGenderCode());
                person.setPhoneNumber(request.getPhoneNumber());
                personRepository.save(person);

                // 2) intake
                IntakeRequest intake = IntakeRequest.builder()
                                .person(person)
                                .requestType("survey")
                                .campusCode(request.getCampusCode())
                                .departmentName(request.getDepartmentName())
                                .statusCode("active")
                                .locale(request.getLocale())
                                .build();
                intakeRequestRepository.save(intake);

                // 3) find survey
                Survey survey = surveyRepository.findById(request.getSurveyId())
                                .orElseThrow(() -> new IllegalArgumentException("Survey not found"));

                // 4) registration draft
                SurveyRegistration reg = SurveyRegistration.builder()
                                .intakeRequest(intake)
                                .survey(survey)
                                .registrationStatus("draft")
                                .surveyVersion(survey.getSurveyVersion())
                                .locale(request.getLocale())
                                .build();
                registrationRepository.save(reg);
                return reg.getId();
        }

        @Override
        @Transactional
        public Long submitResponses(SubmitRequestDto request) {
                SurveyRegistration reg = registrationRepository.findById(request.getRegistrationId())
                                .orElseThrow(() -> new IllegalArgumentException("Registration not found"));

                // save responses
                List<SurveyResponse> entities = request.getResponses().stream().map(r -> SurveyResponse.builder()
                                .registration(reg)
                                .questionCode(r.getQuestionCode())
                                .answerValue(r.getAnswerValue())
                                .answerScore(r.getAnswerScore())
                                .itemOrder(r.getItemOrder())
                                .build()).collect(Collectors.toList());
                responseRepository.saveAll(entities);

                // compute simple total score if provided
                BigDecimal total = entities.stream()
                                .map(SurveyResponse::getAnswerScore)
                                .filter(s -> s != null)
                                .reduce(BigDecimal.ZERO, BigDecimal::add);

                SurveyResult result = SurveyResult.builder()
                                .registration(reg)
                                .totalScore(total)
                                .resultLevel(null)
                                .summaryJson(null)
                                .build();
                resultRepository.save(result);

                reg.setRegistrationStatus("submitted");
                registrationRepository.save(reg);

                return result.getId();
        }

        @Override
        @Transactional(readOnly = true)
        public Page<RegistrationListItemDto> listRegistrations(String locale, String status, Pageable pageable) {
                Page<SurveyRegistration> page = registrationRepository.findByRegistrationStatusAndLocale(status, locale,
                                pageable);
                return page.map(reg -> RegistrationListItemDto.builder()
                                .registrationId(reg.getId())
                                .surveyTitle(reg.getSurvey().getSurveyTitle())
                                .surveyVersion(reg.getSurveyVersion())
                                .locale(reg.getLocale())
                                .departmentName(reg.getIntakeRequest().getDepartmentName())
                                .genderCode(reg.getIntakeRequest().getPerson().getGenderCode())
                                .maskedFullName(maskName(reg.getIntakeRequest().getPerson().getFullName()))
                                .maskedStudentNumber(maskStudentNumber(
                                                reg.getIntakeRequest().getPerson().getStudentNumber()))
                                .startedAt(reg.getStartedAt())
                                .submittedAt(reg.getSubmittedAt())
                                .build());
        }

        private String maskName(String name) {
                if (name == null || name.isEmpty())
                        return name;
                return name.substring(0, 1) + "*".repeat(Math.max(0, name.length() - 1));
        }

        private String maskStudentNumber(String sn) {
                if (sn == null || sn.isEmpty())
                        return null;
                int visible = Math.min(3, sn.length());
                return sn.substring(0, visible) + "*".repeat(Math.max(0, sn.length() - visible));
        }

        @Override
        @Transactional
        public Long upsertPerson(String studentNumber,
                        String fullName,
                        String genderCode,
                        String departmentName,
                        String locale) {
                Person person = Optional.ofNullable(studentNumber)
                                .flatMap(personRepository::findByStudentNumber)
                                .orElseGet(() -> Person.builder().build());
                person.setStudentNumber(studentNumber);
                person.setFullName(fullName);
                person.setGenderCode(genderCode);
                person.setDepartmentName(departmentName);
                person.setLocale(locale);
                personRepository.save(person);
                return person.getId();
        }
}
