import { User } from '../entities/User.js';

export type UserWithoutPassword = Omit<User, 'password'>;

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

export interface AuthResponse {
    token: string;
    user: UserWithoutPassword;
}