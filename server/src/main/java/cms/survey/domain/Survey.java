package cms.survey.domain;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "surveys", uniqueConstraints = @UniqueConstraint(name = "uk_survey_code_ver_locale", columnNames = {
        "survey_code", "survey_version", "locale" }))
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Survey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "survey_code", length = 64, nullable = false)
    private String surveyCode;

    @Column(name = "survey_title", length = 200, nullable = false)
    private String surveyTitle;

    @Column(name = "survey_version", length = 32, nullable = false)
    private String surveyVersion;

    @Column(length = 8, nullable = false)
    private String locale; // 'ko' | 'en'

    @Column(nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
