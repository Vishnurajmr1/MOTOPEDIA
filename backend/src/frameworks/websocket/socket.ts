//Socket config 
import http from 'http';
import { Server, Socket } from 'socket.io';
import chatController from '../../adapters/controllers/chatController';
import AppError from '../../utils/appError';
import HttpStatusCodes from '../../constants/HttpStatusCodes';
import { chatDbRepository } from '../../application/repositories/chatDBRepository';
import { chatRepositoryMongoDB } from '../database/mongodb/repositories/chatRepoMongoDb';
import { userDbRepository } from '../../application/repositories/userDBRepository';
import { userRepositoryMongoDB } from '../database/mongodb/repositories/UserRepoMongoDb';

export const setupSocketIO = async (server: http.Server) => {
    const io = new Server(server, {
        path: '/api/chat/socket.io',
        cors: {
            origin: '*',
            allowedHeaders: ['Authentication'],
            credentials: true,
        },
    });

    io.on('connection', (socket: Socket) => {
        onSocketConnection(io, socket);
    });

};

let users: any[] = [];
const controller=chatController(chatDbRepository,chatRepositoryMongoDB,userDbRepository,userRepositoryMongoDB);

const addUser = (userId: string, socketId: string) => {
    // eslint-disable-next-line no-unused-expressions
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
    return users.find((user) => user.userId === userId);
};

const onSocketConnection = (io: Server, socket: Socket) => {
    console.log('User connected',socket.id);
    socket.on('addUser', (userId: any) => {
        console.log(userId, 'user added');
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });
    

    socket.on('new-message', async (data: any) => {
        try {
            const { sender, recipient, text } = data;
            if (!text ||!sender||!recipient) {
               throw new AppError('Please provide message',HttpStatusCodes.BAD_REQUEST);
            }
            // const senderData = await userService.findUserById(sender);
            // const recipientData = await userService.findUserById(recipient);
            // if (!senderData || !recipientData) throw new BadRequestError('Oops something goes wrong');
            const result = await controller.createChat(
                sender,
                recipient,
                text
            );
            const user1 = getUser(sender);
            const user2 = getUser(recipient);

            const message = { result, currentUserId: sender, participantId: recipient };
            
            if (user1?.socketId) {
                io.to(user1.socketId).emit('receiveMessage', message);
            }

            if (user2?.socketId) {
                io.to(user2.socketId).emit('receiveMessage', message);
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });
    socket.on('disconnect', () => {
        console.log('User disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
};
