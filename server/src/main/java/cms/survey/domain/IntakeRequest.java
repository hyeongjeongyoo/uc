package cms.survey.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "intake_requests")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IntakeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "person_id", nullable = false)
    private Person person;

    @Column(length = 32, nullable = false)
    private String requestType;

    @Column(length = 32)
    private String campusCode;

    @Column(length = 100)
    private String departmentName;

    @Column(length = 32, nullable = false)
    private String statusCode;

    @Column(length = 8)
    private String locale;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime submittedAt;
}
