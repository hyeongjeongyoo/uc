package cms.survey.repository;

import cms.survey.domain.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Optional<Person> findByStudentNumber(String studentNumber);
}
