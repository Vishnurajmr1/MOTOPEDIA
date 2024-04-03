//Socket config
import http from 'http';
import { Express } from 'express';
import cookie from 'cookie';
import { Server, Socket } from 'socket.io';
// import chatController from '../../adapters/controllers/chatController';
import AppError from '../../utils/appError';
import HttpStatusCodes from '../../constants/HttpStatusCodes';
import { chatDbRepository } from '../../application/repositories/chatDBRepository';
import { chatRepositoryMongoDB } from '../database/mongodb/repositories/chatRepoMongoDb';
import { userDbRepository } from '../../application/repositories/userDBRepository';
import { userRepositoryMongoDB } from '../database/mongodb/repositories/UserRepoMongoDb';
import { ChatEventEnum } from '../../constants/chatEventEnum';
import { AuthService } from '../services/authService';
import { customSocket } from '@src/types/socket.Interfact';
import { CustomRequest } from '@src/types/customRequest';
import { IAddNotification } from '@src/types/notification.interface';

export const setupSocketIO = async (app: Express, server: http.Server) => {
    const io = new Server(server, {
        path: '/api/chat/socket.io',
        cors: {
            origin: '*',
            allowedHeaders: ['Authentication'],
            credentials: true,
        },
    });

    app.set('io', io);
    io.on('connection', (socket: Socket) => {
        onSocketConnection(io, socket);
    });
};

type userArray = {
    userId: string;
    socketId: string;
};
let users: userArray[] = [];

const addUser = (userId: string, socketId: string) => {
    // eslint-disable-next-line no-unused-expressions
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
    return users.find((user) => user.userId === userId);
};

const mountJoinChatEvent = (socket: Socket) => {
    socket.on(ChatEventEnum.JOIN_CHAT_EVENT, (chatId: string) => {
        console.log(`User joined the chat 🤝. chatId: `, chatId);
        socket.join(chatId);
    });
};
const mountTypingChatEvent = (socket: Socket) => {
    socket.on(ChatEventEnum.TYPING_EVENT, (chatId: string) => {
        socket.in(chatId).emit(ChatEventEnum.TYPING_EVENT, chatId);
    });
};
const mountParticipantStopTypingEvent = (socket: Socket) => {
    socket.on(ChatEventEnum.STOP_TYPING_EVENT, (chatId: string) => {
        socket.in(chatId).emit(ChatEventEnum.STOP_TYPING_EVENT, chatId);
    });
};
const receivenewNotificationEvent = (socket: Socket) => {
    socket.on(ChatEventEnum.NOTIFICATION_RECEIVED_EVENT, (notification: IAddNotification) => {
        socket.in(notification.recipient).emit(ChatEventEnum.NOTIFICATION_RECEIVED_EVENT, notification);
    });
};

const onSocketConnection = (io: Server, socket: Socket) => {
    console.log('User connected', socket.id);
    try {
        socket.on('addUser', async (userId: string) => {
            console.log(userId, 'user added');
            addUser(userId, socket.id);
            if (userId !== null) {
                socket.join(userId.toString());
                console.log('User Connected 🗼 .userId', userId);
            }
        });
        socket.emit(ChatEventEnum.CONNECTED_EVENT);
        mountJoinChatEvent(socket);
        mountTypingChatEvent(socket);
        mountParticipantStopTypingEvent(socket);
        receivenewNotificationEvent(socket);
        console.log('Successfull');
        socket.on(ChatEventEnum.DISCONNECT_EVENT, () => {
            console.log(`User has disconnected🚫.userId`, socket.id);
            removeUser(socket.id);
            console.log(users);
            io.emit('getUsers', users);
        });
    } catch (error: any) {
        socket.emit(
            ChatEventEnum.SOCKET_ERROR_EVENT,
            error.message || 'Something went wrong while connecting to the socket.',
        );
    }
};

export const emitSocketEvent = (req: CustomRequest, roomId: string, event: any, payload: any) => {
    req.app.get('io').in(roomId).emit(event, payload);
};

// export const emitSocketToEvent = (req: CustomRequest, userId: string, event: any, payload: any) => {
//     req.app.get('io').to(userId).emit(event, payload);
// };
