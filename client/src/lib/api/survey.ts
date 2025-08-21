import { privateApi, publicApi } from "./client";
import type { ApiResponse } from "@/types/api-response";

export const surveyKeys = {
	list: (params: any) => ["cms", "surveys", "registrations", params] as const,
};

export const surveyApi = {
	createDraft: async (body: {
		studentNumber?: string;
		fullName: string;
		genderCode?: string;
		phoneNumber?: string;
		departmentName?: string;
		campusCode?: string;
		locale: "ko" | "en";
		surveyId: number;
	}): Promise<ApiResponse<number>> => {
		const response = await publicApi.post<ApiResponse<number>>(
			"/cms/surveys/registrations/draft",
			body
		);
		return response.data;
	},

	submit: async (body: {
		registrationId: number;
		responses: { questionCode: string; answerValue?: string; answerScore?: number; itemOrder?: number }[];
	}): Promise<ApiResponse<number>> => {
		const response = await publicApi.post<ApiResponse<number>>(
			"/cms/surveys/submit",
			body
		);
		return response.data;
	},

	listRegistrations: async (params: { locale: string; status?: string; page?: number; size?: number }): Promise<ApiResponse<any>> => {
		const response = await privateApi.get<ApiResponse<any>>(
			"/cms/surveys/registrations",
			{ params }
		);
		return response.data;
	},
};
