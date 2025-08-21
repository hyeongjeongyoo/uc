package cms.survey.service;

import cms.survey.dto.DraftCreateRequestDto;
import cms.survey.dto.SubmitRequestDto;
import cms.survey.dto.RegistrationListItemDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SurveyService {

    Long createDraft(DraftCreateRequestDto request);

    Long submitResponses(SubmitRequestDto request);

    Page<RegistrationListItemDto> listRegistrations(String locale, String status, Pageable pageable);
}
