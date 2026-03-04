import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    jwt: {
        secret: process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },
    
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'admin',
        database: process.env.DB_NAME || 'user_test',
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
        logging: process.env.NODE_ENV === 'development' 
            ? ["error", "warn", "schema"] 
            : ["error"],   
    }
};