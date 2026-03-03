import { Request, Response, NextFunction } from 'express';

type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<any>;

// обертка для контроллеров, которая передает ошибки в next()
export const tryCatch = (controller: AsyncController) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            next(error); 
        }
    };
};