package cms.survey.repository;

import cms.survey.domain.SurveyRegistration;
import cms.survey.domain.SurveyResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SurveyResultRepository extends JpaRepository<SurveyResult, Long> {
    Optional<SurveyResult> findByRegistration(SurveyRegistration registration);
}
