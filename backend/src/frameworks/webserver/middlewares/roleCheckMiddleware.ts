import { NextFunction, Response } from 'express';
import { CustomRequest } from '@src/types/customRequest';
import AppError from '@src/utils/appError';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

const roleCheckMiddleware = (roleToCheck: string) => {
    console.log(roleToCheck)
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        const role = req.user?.role;
        console.log(role)
        if (role === roleToCheck) {
            next();
        } else {
            throw new AppError('Unauthorized role', HttpStatusCodes.UNAUTHORIZED);
        }
    };
};

export default roleCheckMiddleware;
