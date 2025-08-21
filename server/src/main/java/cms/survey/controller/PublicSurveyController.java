package cms.survey.controller;

import cms.survey.service.SurveyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/public/surveys")
@RequiredArgsConstructor
public class PublicSurveyController {

    private final SurveyService surveyService;

    public static class SavePersonRequest {
        public String studentNumber;
        public String fullName;
        public String genderCode;
        public String departmentName; // 저장 위치는 intake가 이상적이나, 요구사항에 따라 Person만 우선 저장
        public String locale;
    }

    @PostMapping("/persons")
    @Transactional
    public ResponseEntity<Long> savePerson(@RequestBody SavePersonRequest req) {
        if (req.fullName == null || req.fullName.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Long id = surveyService.upsertPerson(
                req.studentNumber,
                req.fullName,
                req.genderCode,
                req.departmentName,
                req.locale);
        return ResponseEntity.created(URI.create("/public/surveys/persons/" + id)).body(id);
    }
}
