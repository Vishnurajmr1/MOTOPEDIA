import express, { Application, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import { rateLimiter as limiter } from './middlewares/rate-limit';
import configKeys from '../../config';

const expressConfig = (app: Application) => {
    //Development logging
    if (configKeys.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
    app.set('trust proxy',true);
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(limiter);
    app.use(helmet());
    app.use(mongoSanitize());
};

export default expressConfig;
