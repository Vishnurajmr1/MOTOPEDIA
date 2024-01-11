import express, { Application, NextFunction, Request, Response } from 'express';
import http from 'http';
import connectToMongodb from './frameworks/database/mongodb/connection';
import colors from 'colors.ts';
import AppError from './utils/appError';
import expressConfig from './frameworks/webserver/express';
import serverConfig from './frameworks/webserver/server';
import errorHandlingMiddleware from './frameworks/webserver/middlewares/errorHandlingMiddleware';
import routes from './frameworks/webserver/routes';
import socketConfig from './frameworks/websocket/socket';
import { authService } from './frameworks/services/authService';
import { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents, SocketData } from './types/socket.Interfact';
import configKeys from './config';
import io from './frameworks/websocket/socket.connection';

colors?.enable();

const app: Application = express();
export const server = http.createServer(app);

// const io=new Server<ClientToServerEvents,ServerToClientEvents,SocketData>(server,{
//     cors:{
//         origin:"*",
//         methods:["GET","POST","PUT","PATCH"]
//     }
// })
socketConfig(io,authService());
connectToMongodb();
expressConfig(app);

routes(app)

//error handling middleware
app.use(errorHandlingMiddleware);

//* catch 404 and forward to error handler
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError('Not found', 404));
});

serverConfig(server).startServer();
