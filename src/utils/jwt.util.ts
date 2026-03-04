import jwt from 'jsonwebtoken';
import { config } from '../config.js';

const JWT_SECRET: string = config.jwt.secret;
const JWT_EXPIRES_IN = config.jwt.expiresIn;

export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

export const generateToken = (payload: JwtPayload): string => {
    const tokenPayload = {
        userId: payload.userId,
        email: payload.email,
        role: payload.role
    };
    
    return jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as Record<string, any>;
        
        return {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role
        };
    } catch (error) {
        throw new Error('Недействительный токен');
    }
};