"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitSocketEvent = exports.setupSocketIO = void 0;
const socket_io_1 = require("socket.io");
const chatEventEnum_1 = require("../../constants/chatEventEnum");
const setupSocketIO = (app, server) => __awaiter(void 0, void 0, void 0, function* () {
    const io = new socket_io_1.Server(server, {
        path: '/api/chat/socket.io',
        cors: {
            origin: '*',
            allowedHeaders: ['Authentication'],
            credentials: true,
        },
    });
    app.set('io', io);
    io.on('connection', (socket) => {
        onSocketConnection(io, socket);
    });
});
exports.setupSocketIO = setupSocketIO;
let users = [];
const addUser = (userId, socketId) => {
    // eslint-disable-next-line no-unused-expressions
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};
const mountJoinChatEvent = (socket) => {
    socket.on(chatEventEnum_1.ChatEventEnum.JOIN_CHAT_EVENT, (chatId) => {
        console.log(`User joined the chat 🤝. chatId: `, chatId);
        socket.join(chatId);
    });
};
const mountTypingChatEvent = (socket) => {
    socket.on(chatEventEnum_1.ChatEventEnum.TYPING_EVENT, (chatId) => {
        socket.in(chatId).emit(chatEventEnum_1.ChatEventEnum.TYPING_EVENT, chatId);
    });
};
const mountParticipantStopTypingEvent = (socket) => {
    socket.on(chatEventEnum_1.ChatEventEnum.STOP_TYPING_EVENT, (chatId) => {
        socket.in(chatId).emit(chatEventEnum_1.ChatEventEnum.STOP_TYPING_EVENT, chatId);
    });
};
const receivenewNotificationEvent = (socket) => {
    socket.on(chatEventEnum_1.ChatEventEnum.NOTIFICATION_RECEIVED_EVENT, (notification) => {
        socket.in(notification.recipient).emit(chatEventEnum_1.ChatEventEnum.NOTIFICATION_RECEIVED_EVENT, notification);
    });
};
const sendVideoMessages = (socket) => {
    socket.on(chatEventEnum_1.ChatEventEnum.CREATE_VIDEO_CALL, (payload) => {
        socket.broadcast.emit(chatEventEnum_1.ChatEventEnum.VIDEO_CALL_RECEIVED_EVENT, payload);
    });
};
const onSocketConnection = (io, socket) => {
    console.log('User connected', socket.id);
    try {
        socket.on('addUser', (userId) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(userId, 'user added');
            addUser(userId, socket.id);
            if (userId !== null) {
                socket.join(userId.toString());
                console.log('User Connected 🗼 .userId', userId);
            }
        }));
        socket.emit(chatEventEnum_1.ChatEventEnum.CONNECTED_EVENT);
        mountJoinChatEvent(socket);
        mountTypingChatEvent(socket);
        mountParticipantStopTypingEvent(socket);
        receivenewNotificationEvent(socket);
        sendVideoMessages(socket);
        console.log('Successfull');
        socket.on(chatEventEnum_1.ChatEventEnum.DISCONNECT_EVENT, () => {
            console.log(`User has disconnected🚫.userId`, socket.id);
            removeUser(socket.id);
            console.log(users);
            io.emit('getUsers', users);
        });
    }
    catch (error) {
        socket.emit(chatEventEnum_1.ChatEventEnum.SOCKET_ERROR_EVENT, error.message || 'Something went wrong while connecting to the socket.');
    }
};
const emitSocketEvent = (req, roomId, event, payload) => {
    req.app.get('io').in(roomId).emit(event, payload);
};
exports.emitSocketEvent = emitSocketEvent;
// export const emitSocketToEvent = (req: CustomRequest, userId: string, event: any, payload: any) => {
//     req.app.get('io').to(userId).emit(event, payload);
// };
//# sourceMappingURL=socket.js.map