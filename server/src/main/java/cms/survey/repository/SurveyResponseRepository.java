package cms.survey.repository;

import cms.survey.domain.SurveyRegistration;
import cms.survey.domain.SurveyResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SurveyResponseRepository extends JpaRepository<SurveyResponse, Long> {
    List<SurveyResponse> findByRegistration(SurveyRegistration registration);
}
