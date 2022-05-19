import { NextFunction, Request, Response } from 'express';
import { responseJoiError } from '@/helpers/response';
import { joi } from "@/plugins/joi";

const createUserBodySchema = joi.object({
	name: joi.string().max(100).required()
});

export function validateCreateUser(req: Request, res: Response, next: NextFunction) {
	const result = createUserBodySchema.validate(req.body);
	if (result.error) {
		return responseJoiError(res, result.error);
	}
	next();
}

