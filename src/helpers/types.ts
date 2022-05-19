import { HttpCode } from "@/helpers/constants";

export interface IErrorDetail {
	key: string;
	errorCode: HttpCode;
	message: string;
}