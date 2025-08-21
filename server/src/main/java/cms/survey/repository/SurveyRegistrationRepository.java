package cms.survey.repository;

import cms.survey.domain.SurveyRegistration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRegistrationRepository extends JpaRepository<SurveyRegistration, Long> {
    Page<SurveyRegistration> findByRegistrationStatusAndLocale(String status, String locale, Pageable pageable);
}
