import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from './error.middleware.js';
import { AuthRequest } from './auth.middleware.js';

//проверка админа
export const isAdmin = (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
) => {
    if (!req.user) {
        return next(new AppError('Неавторизованный доступ', StatusCodes.UNAUTHORIZED));
    }

    if (req.user.role !== 'admin') {
        return next(new AppError('Доступ запрещен. Требуются права администратора', StatusCodes.FORBIDDEN));
    }

    next();
};

//проверка - или юзер смотрит свой ресурс или админ
export const isSelfOrAdmin = (paramName: string = 'id') => {
    return (
        req: AuthRequest,
        _res: Response,
        next: NextFunction
    ) => {
        if (!req.user) {
            return next(new AppError('Неавторизованный доступ', StatusCodes.UNAUTHORIZED));
        }

        const targetUserId = req.params[paramName];
        
        if (req.user.role === 'admin') {
            return next();
        }
        
        if (req.user.userId === targetUserId) {
            return next();
        }

        return next(new AppError('Доступ запрещен', StatusCodes.FORBIDDEN));
    };
};