import { ClientToServerEvents, ServerToClientEvents, SocketData } from '../../types/socket.Interfact';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../services/authService';
import AppError from '../../utils/appError';
import HttpStatusCodes from '../../constants/HttpStatusCodes';

const socketConfig = (
    io: Server<ClientToServerEvents, ServerToClientEvents, SocketData>,
    authService: ReturnType<AuthService>,
) => {
    io.use((socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            const res: any = authService.verifyToken(socket.handshake.query.token as string);
            socket.data.userId = res.payload;
            next();
        } else {
            next(new AppError('Authentication token not provided', HttpStatusCodes.UNAUTHORIZED));
        }
    }).on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents, SocketData>) => {
        console.log(`User connected:${socket.id}`.bg_magenta);

        socket.on('request_data', () => {
            const data = { message: 'Hello from the server!' };

            socket.emit('response_data', data);
        });

        socket.on('join_room', (userId: string) => {
            socket.join(userId);
            console.log(`User ${socket.id} joined room${userId}`);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected:${socket.id}`);
        });
    });
};

export default socketConfig;
