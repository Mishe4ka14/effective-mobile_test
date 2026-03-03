import { AppDataSource } from '../data-source.js';
import { User, UserRole, UserStatus } from '../entities/User.js';
import { hashPassword, comparePassword } from '../utils/hash.util.js';
import { generateToken } from '../utils/jwt.util.js';
import { ERROR_MESSAGES } from '../constants/error-messages.constants.js';
import { AppError } from '../middlewares/error.middleware.js';
import { StatusCodes } from 'http-status-codes';

export interface RegisterUserData {
    fullName: string;
    birthDate: Date;
    email: string;
    password: string;
}

export interface LoginUserData {
    email: string;
    password: string;
}

export class AuthService {

    // РЕГИСТРАЦИЯ

    async register(userData: RegisterUserData): Promise<Omit<User, 'password'>> {
        const userRepository = AppDataSource.getRepository(User);
        
        //проверяем есть ли юзер
        const existingUser = await userRepository.findOne({
            where: { email: userData.email }
        });
        
        if (existingUser) {
            throw new AppError(ERROR_MESSAGES.EMAIL_EXISTS, StatusCodes.CONFLICT);
        }
        
        //хешируем пароль
        const hashedPassword = await hashPassword(userData.password);
        
        const newUser = userRepository.create({
            fullName: userData.fullName,
            birthDate: userData.birthDate,
            email: userData.email,
            password: hashedPassword,
            role: UserRole.USER,      
            status: UserStatus.ACTIVE,  
        });
        
        const savedUser = await userRepository.save(newUser);
        const { password, ...userWithoutPassword } = savedUser;
        return userWithoutPassword;
    }

    //АВТОРИЗАЦИЯ

    async login(loginData: LoginUserData): Promise<{ token: string; user: Omit<User, 'password'> }> {
        const userRepository = AppDataSource.getRepository(User);
        
        //проверяем есть ли юзер
        const user = await userRepository.findOne({
            where: { email: loginData.email }
        });
        
        if (!user) {
            throw new AppError(ERROR_MESSAGES.INVALID_CREDENTIALS, StatusCodes.UNAUTHORIZED);
        }

        // проверяем статус
        if (user.status !== UserStatus.ACTIVE) {
            throw new AppError(ERROR_MESSAGES.USER_BLOCKED, StatusCodes.UNAUTHORIZED);
        }
        
        // проверяем пароль
        const isPasswordValid = await comparePassword(loginData.password, user.password);
        
        if (!isPasswordValid) {
            throw new AppError(ERROR_MESSAGES.INVALID_CREDENTIALS, StatusCodes.UNAUTHORIZED);
        }
        
        // Генерируем токен
        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role
        });
        
        const { password, ...userWithoutPassword } = user;
        
        return {
            token,
            user: userWithoutPassword
        };
    }
}

export const authService = new AuthService();