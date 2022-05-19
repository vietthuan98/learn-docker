import { responseSuccess } from '@/helpers/response';
import { NextFunction, Request, Response } from 'express';
import { createUserToMysql } from '@/modules/user/service';

export async function getUsers(_req: Request, res: Response, next: NextFunction) {
	try {
		const users = [
			{
				id: 1,
				name: 'John',
			}
		];
		responseSuccess(res, users);
	} catch (error) {
		next(error);
	}
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
	try {
		const user = await createUserToMysql(req.body);
		responseSuccess(res, user);
	} catch (error) {
		next(error);
	}
}