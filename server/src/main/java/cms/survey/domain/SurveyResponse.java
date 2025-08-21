package cms.survey.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "survey_responses")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SurveyResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "registration_id", nullable = false)
    private SurveyRegistration registration;

    @Column(length = 100, nullable = false)
    private String questionCode;

    @Lob
    private String answerValue;

    @Column(precision = 10, scale = 4)
    private java.math.BigDecimal answerScore;

    private Integer itemOrder;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
