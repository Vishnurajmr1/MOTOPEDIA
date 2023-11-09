import { NextFunction, Request, Response } from 'express';
import AppError from '@src/utils/appError';

const errorHandlingMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (err.name === 'MongoServerError') {
        const field = Object.keys(err.keyValue)[0];
        if (field === 'mobile') {
            res.status(409).json({
                status: 'error',
                message: 'Mobile already exists',
            });
        } else {
            res.status(409).json({
                status: 'error',
                message: 'Duplicate key error',
                error: err.keyValue,
            });
        }
    } else if (err.statusCode === 404) {
        res.status(err.statusCode).json({ error: err.status, errorMessage: err.message });
    } else {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
};

export default errorHandlingMiddleware;
