import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/jwt.util.js';
import { AppError } from './error.middleware.js';

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        email: string;
        role: string;
    };
}

export const authMiddleware = (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
) => {
    try {
        //получаем токен
        const authHeader = req.headers.authorization;
        
        if (!authHeader) {
            throw new AppError('Отсутсвует токен авторизации', StatusCodes.UNAUTHORIZED);
        }
        
        //проверяем формат токена
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new AppError('Неверный формат токена', StatusCodes.UNAUTHORIZED);
        }

        const token = parts[1];
        const decoded = verifyToken(token);
        req.user = decoded;
        
        next();
    } catch (error) {
        if (error instanceof AppError) {
            next(error);
        } else {
            next(new AppError('Недействительный токен', StatusCodes.UNAUTHORIZED));
        }
    }
};