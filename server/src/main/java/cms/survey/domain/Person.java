package cms.survey.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "persons")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 32, unique = true)
    private String studentNumber;

    @Column(length = 100, nullable = false)
    private String fullName;

    @Column(length = 16)
    private String genderCode;

    @Column(length = 32)
    private String phoneNumber;

    @Column(length = 100)
    private String departmentName;

    @Column(length = 8)
    private String locale;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
