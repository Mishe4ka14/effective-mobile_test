import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ERROR_MESSAGES } from '../constants/error-messages.constants.js';

export class AppError extends Error {
    statusCode: number;
    
    constructor(message: string, statusCode: number = StatusCodes.BAD_REQUEST) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

// middleware для обработки ошибок
export const errorMiddleware = (
    err: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    // логируем
    console.error(`[${new Date().toISOString()}] Ошибка:`, err);
    
    //кастомная ошибка
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            error: err.message
        });
        return;
    }
    
    //ошибка сервиса
    if (err.message === ERROR_MESSAGES.EMAIL_EXISTS) {
        res.status(StatusCodes.CONFLICT).json({ error: err.message });
        return;
    }
    
    if (err.message === ERROR_MESSAGES.INVALID_CREDENTIALS || 
        err.message === ERROR_MESSAGES.USER_BLOCKED) {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: err.message });
        return;
    }
    
    //сторонняя ошибка
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        error: ERROR_MESSAGES.INTERNAL_SERVER 
    });
};