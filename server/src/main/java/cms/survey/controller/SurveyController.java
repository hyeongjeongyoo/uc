package cms.survey.controller;

import cms.common.dto.ApiResponseSchema;
import cms.survey.dto.DraftCreateRequestDto;
import cms.survey.dto.RegistrationListItemDto;
import cms.survey.dto.SubmitRequestDto;
import cms.survey.service.SurveyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cms/surveys")
@RequiredArgsConstructor
public class SurveyController {

    private final SurveyService surveyService;

    @PostMapping("/registrations/draft")
    public ResponseEntity<ApiResponseSchema<Long>> createDraft(@RequestBody DraftCreateRequestDto request) {
        Long id = surveyService.createDraft(request);
        return ResponseEntity.ok(ApiResponseSchema.success(id));
    }

    @PostMapping("/submit")
    public ResponseEntity<ApiResponseSchema<Long>> submit(@RequestBody SubmitRequestDto request) {
        Long resultId = surveyService.submitResponses(request);
        return ResponseEntity.ok(ApiResponseSchema.success(resultId));
    }

    @GetMapping("/registrations")
    public ResponseEntity<ApiResponseSchema<Page<RegistrationListItemDto>>> list(
            @RequestParam String locale,
            @RequestParam(defaultValue = "submitted") String status,
            @PageableDefault(sort = "submittedAt", direction = org.springframework.data.domain.Sort.Direction.DESC) Pageable pageable) {
        Page<RegistrationListItemDto> page = surveyService.listRegistrations(locale, status, pageable);
        return ResponseEntity.ok(ApiResponseSchema.success(page));
    }
}
