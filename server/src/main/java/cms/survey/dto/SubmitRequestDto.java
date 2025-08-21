package cms.survey.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubmitRequestDto {
	private Long registrationId;
	private List<ResponseItemDto> responses;

	@Getter
	@Setter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class ResponseItemDto {
		private String questionCode;
		private String answerValue;
		private BigDecimal answerScore; // 옵션
		private Integer itemOrder;
	}
}


