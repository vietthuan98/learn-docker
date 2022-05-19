require("dotenv").config();
import { Response } from 'express';
import { HttpCode } from '@/helpers/constants';
import { IErrorDetail } from '@/helpers/types';
import { ValidationError } from 'joi';

const version = process.env.VERSION;

export function responseSuccess(res: Response, data: any = {}) {
    return res.status(HttpCode.Ok).json({
        code: HttpCode.Ok,
        message: 'Success',
        data,
        version
    });
};

export function responseError(
    res: Response,
    code = HttpCode.InternalServerError,
    message = '',
    errors: IErrorDetail[] = []) {
    return res.status(code).json({
        code,
        message,
        errors,
        version
    })
};

export function responseJoiError(res: Response, error: ValidationError) {
    const errors: IErrorDetail[] = (error.details || []).map(err => ({
        key: err?.context?.key as string,
        errorCode: HttpCode.BadRequest,
        message: err?.message || 'Bad request'
    }));
    return responseError(res, HttpCode.BadRequest, 'Bad request', errors);
}
