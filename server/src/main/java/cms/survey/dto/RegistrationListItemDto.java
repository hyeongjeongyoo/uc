package cms.survey.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationListItemDto {
	private Long registrationId;
	private String surveyTitle;
	private String surveyVersion;
	private String locale;
	private String departmentName;
	private String genderCode;
	private String maskedFullName;
	private String maskedStudentNumber;
	private LocalDateTime startedAt;
	private LocalDateTime submittedAt;
}


