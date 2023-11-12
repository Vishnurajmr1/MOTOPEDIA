import { NextFunction, Response } from 'express';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { authService } from '@src/frameworks/services/authService';
import { CustomRequest } from '@src/types/customRequest';
import AppError from '@src/utils/appError';
import { JwtPayload } from '@src/types/common';


const jwtAuthMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    let token: string | null = '';
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        throw new AppError('Token not found', HttpStatusCodes.UNAUTHORIZED)
    }
    try {
        const { payload, expired } = authService().verifyToken(token) as {
            payload: JwtPayload;
            expired: boolean;
        };
        req.user = payload;
        next();
    } catch (error) {
        throw new AppError('Session is expired please login again', HttpStatusCodes.FORBIDDEN);
    }
}

export default jwtAuthMiddleware;