import express, { Application, NextFunction, Request, Response } from 'express';
import http from 'http';
import connectToMongodb from './frameworks/database/mongodb/connection';
import colors from 'colors.ts';
import AppError from './utils/appError';
import expressConfig from './frameworks/webserver/express';
import serverConfig from './frameworks/webserver/server';
import errorHandlingMiddleware from './frameworks/webserver/middlewares/errorHandlingMiddleware';

colors?.enable();

const app: Application = express();
const server = http.createServer(app);
connectToMongodb();
expressConfig(app);

//error handling middleware
app.use(errorHandlingMiddleware);

//* catch 404 and forward to error handler
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError('Not found', 404));
});

serverConfig(server).startServer();
