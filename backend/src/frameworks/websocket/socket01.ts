import http from 'http';
import { Server, Socket } from 'socket.io';

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

const addUser = (userId: any, socketId: any) => {
    // eslint-disable-next-line no-unused-expressions
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId: any) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: any) => {
    return users.find((user) => user.userId === userId);
};

const onSocketConnection = (io: Server, socket: Socket) => {
    console.log('User connected',socket.id);

    socket.on('addUser', (userId: any) => {
        console.log(userId, 'user added');
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });
    

    // socket.on('message', async (data: any) => {
    //     try {
    //         const { sender, recipient, text } = data;
    //         if (!text) throw new BadRequestError('Please provide message');
    //         const senderData = await userService.findUserById(sender);
    //         const recipientData = await userService.findUserById(recipient);
    //         if (!senderData || !recipientData) throw new BadRequestError('Oops something goes wrong');
    //         const result = await messageService.addMessage(
    //             senderData.id,
    //             recipientData?.id,
    //             text
    //         );
    //         const user1 = getUser(sender);
    //         const user2 = getUser(recipient);

    //         const message = { result, currentUserId: sender, participantId: recipient };
            
    //         if (user1?.socketId) {
    //             io.to(user1.socketId).emit('receiveMessage', message);
    //         }

    //         if (user2?.socketId) {
    //             io.to(user2.socketId).emit('receiveMessage', message);
    //         }
    //     } catch (error) {
    //         console.error('Error processing message:', error);
    //     }
    // });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
};