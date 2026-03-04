import express, { Application, Request, Response } from 'express';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter)
app.use(errorMiddleware);
export default app;