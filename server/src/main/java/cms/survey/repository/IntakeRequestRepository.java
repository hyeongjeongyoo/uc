package cms.survey.repository;

import cms.survey.domain.IntakeRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IntakeRequestRepository extends JpaRepository<IntakeRequest, Long> {
}
