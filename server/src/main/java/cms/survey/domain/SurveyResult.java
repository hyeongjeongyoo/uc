package cms.survey.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "survey_results")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SurveyResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "registration_id", nullable = false, unique = true)
    private SurveyRegistration registration;

    @Column(precision = 10, scale = 4)
    private java.math.BigDecimal totalScore;

    @Column(length = 64)
    private String resultLevel;

    @Column(columnDefinition = "JSON")
    private String summaryJson; // MariaDB JSON (문자열로 매핑)

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime computedAt;
}
