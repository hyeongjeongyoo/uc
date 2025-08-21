package cms.survey.repository;

import cms.survey.domain.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SurveyRepository extends JpaRepository<Survey, Long> {
    List<Survey> findByIsActiveTrueAndLocaleOrderBySurveyTitleAsc(String locale);
}
