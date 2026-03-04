import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { authService } from '../services/auth.service.js';
import { REGEX } from '../constants/regex.constants.js';
import { ERROR_MESSAGES } from '../constants/error-messages.constants.js';
import { AppError } from '../middlewares/error.middleware.js';

export class AuthController {

    // РЕГИСТРАЦИЯ 

    register = async (req: Request, res: Response): Promise<void> => {
        const { fullName, birthDate, email, password } = req.body;
        
        if (!fullName || !birthDate || !email || !password) {
            throw new AppError(ERROR_MESSAGES.REQUIRED_FIELDS, StatusCodes.BAD_REQUEST);
        }
        
        if (!REGEX.EMAIL.test(email)) {
            throw new AppError(ERROR_MESSAGES.INVALID_EMAIL, StatusCodes.BAD_REQUEST);
        }
        
        //проверяем формат даты
        const birthDateObj = new Date(birthDate);
        if (isNaN(birthDateObj.getTime())) {
            throw new AppError(ERROR_MESSAGES.INVALID_DATE, StatusCodes.BAD_REQUEST);
        }
        
        const { token, user } = await authService.register({
            fullName,
            birthDate: birthDateObj,
            email,
            password
        });
        
        res.status(StatusCodes.CREATED).json({
            message: 'Пользователь успешно зарегистрирован',
            token,
            user
        });
    }

    //АВТОРИЗАЦИЯ

    login = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
        
        if (!email || !password) {
            throw new AppError(ERROR_MESSAGES.EMAIL_PASSWORD_REQUIRED, StatusCodes.BAD_REQUEST);
        }
        
        if (!REGEX.EMAIL.test(email)) {
            throw new AppError(ERROR_MESSAGES.INVALID_EMAIL, StatusCodes.BAD_REQUEST);
        }
        
        const result = await authService.login({ email, password });
        
        res.status(StatusCodes.OK).json({
            message: 'Успешная авторизация',
            ...result
        });
    }
}

export const authController = new AuthController();