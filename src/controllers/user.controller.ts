import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { userService } from '../services/user.service.js';
import { AuthRequest } from '../middlewares/auth.middleware.js';
import { AppError } from '../middlewares/error.middleware.js';

class UserController {
    getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
        const id = req.params.id as string;
        
        if (!id) {
            throw new AppError('ID пользователя обязателен', StatusCodes.BAD_REQUEST);
        }
        
        const user = await userService.getUserById(id);
        
        res.status(StatusCodes.OK).json({
            success: true,
            user
        });
    }

    getAllUsers = async (_req: AuthRequest, res: Response): Promise<void> => {
        const users = await userService.getAllUsers();
        
        res.status(StatusCodes.OK).json({
            success: true,
            count: users.length,
            users
        });
    }

    blockUser = async (req: AuthRequest, res: Response): Promise<void> => {
        const id = req.params.id as string;
        
        if (!id) {
            throw new AppError('ID пользователя обязателен', StatusCodes.BAD_REQUEST);
        }
        
        const user = await userService.blockUser(id);
        
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Пользователь заблокирован',
            user
        });
    }

    //ОПЦИОНАЛЬНЫЙ МЕТОД - РАЗБЛОКИРОВКА, ДОСТУП ТОЛЬКО У АДМИНА
    unblockUser = async (req: AuthRequest, res: Response): Promise<void> => {
        const id = req.params.id as string;
        
        if (!id) {
            throw new AppError('ID пользователя обязателен', StatusCodes.BAD_REQUEST);
        }
        
        const user = await userService.unblockUser(id);
        
        res.status(StatusCodes.OK).json({
            success: true,
            message: 'Пользователь разблокирован',
            user
        });
    }
}

export const userController = new UserController();