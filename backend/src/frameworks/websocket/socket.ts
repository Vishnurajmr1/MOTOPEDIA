import { ClientToServerEvents, ServerToClientEvents, SocketData } from '../../types/socket.Interfact';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../services/authService';
import AppError from '../../utils/appError';
import HttpStatusCodes from '../../constants/HttpStatusCodes';

const socketConfig = (
    io: Server<ClientToServerEvents, ServerToClientEvents, SocketData>,
    authService: ReturnType<AuthService>,
) => {
    let users:any[]=[];
    const addUser=(userId:string,socketId:any)=>{
        !users.some((user)=>user.userId===userId)&&
        users.push({userId,socketId})
    }
    const removeUser=(socketId:any)=>{
        users=users.filter((user)=>user.socketId!==socketId)
    }
    const getUser=(userId:string)=>{
        return users.find((user)=>user.userId===userId);
    }
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

        socket.on('addUser', (userId: string) => {
            console.log(userId,'user added');
            addUser(userId,socket.id)
            io.emit('getUsers',users) 
        });
        socket.on('disconnect', () => {
            console.log(`User disconnected:${socket.id}`);
        });
    });
};

export default socketConfig;
