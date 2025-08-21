package cms.survey.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DraftCreateRequestDto {
	private String studentNumber;
	private String fullName;
	private String genderCode;
	private String phoneNumber;
	private String departmentName;
	private String campusCode;
	private String locale; // 'ko' | 'en'
	private Long surveyId;
}


