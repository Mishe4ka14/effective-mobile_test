import { AppDataSource } from '../data-source.js';
import { User, UserStatus } from '../entities/User.js';
import { AppError } from '../middlewares/error.middleware.js';
import { StatusCodes } from 'http-status-codes';
import { UserWithoutPassword } from '../types/user.types.js';

export class UserService {
    private userRepository = AppDataSource.getRepository(User);

    //ПОЛУЧЕНИЕ ЮЗЕРА
    async getUserById(id: string): Promise<UserWithoutPassword> {
        const user = await this.userRepository.findOne({
            where: { id }
        });

        if (!user) {
            throw new AppError('Пользователь не найден', StatusCodes.NOT_FOUND);
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    //ПОЛУЧЕНИЕ ВСЕХ ЮЗЕРОВ
    async getAllUsers(): Promise<UserWithoutPassword[]> {
        const users = await this.userRepository.find({
            order: { createdAt: 'DESC' }
        });

        return users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
    }

    //БЛОКИРОВКА
    async blockUser(id: string): Promise<UserWithoutPassword> {
        const user = await this.userRepository.findOne({
            where: { id }
        });

        if (!user) {
            throw new AppError('Пользователь не найден', StatusCodes.NOT_FOUND);
        }

        //проверяем если уже заблокирован, чтобы не делать лишних действий в бд
        if (user.status === UserStatus.BLOCKED) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }

        user.status = UserStatus.BLOCKED;
        const updatedUser = await this.userRepository.save(user);

        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }

    ////ОПЦИОНАЛЬНЫЙ МЕТОД - РАЗБЛОКИРОВКА, ДОСТУП ТОЛЬКО У АДМИНА
    async unblockUser(id: string): Promise<UserWithoutPassword> {
        const user = await this.userRepository.findOne({
            where: { id }
        });
    
        if (!user) {
            throw new AppError('Пользователь не найден', StatusCodes.NOT_FOUND);
        }
    
        if (user.status === UserStatus.ACTIVE) {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
    
        user.status = UserStatus.ACTIVE;
        const updatedUser = await this.userRepository.save(user);
    
        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }
}

export const userService = new UserService();