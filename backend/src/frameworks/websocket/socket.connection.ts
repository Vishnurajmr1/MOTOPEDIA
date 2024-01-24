import { Server  } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents, SocketData } from '../../types/socket.Interfact';
import http from 'http';
import configKeys from '@src/config';
import server from '../../app';
const io = new Server<ClientToServerEvents,ServerToClientEvents,SocketData>(server, {
    path: '/api/chat/socket.io',
    cors: {
        origin: '*',
        allowedHeaders: ['Authentication'],
        credentials: true,
    },
});
export default io;

