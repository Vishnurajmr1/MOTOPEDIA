import { Server } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents, SocketData } from '../../types/socket.Interfact';
import { server } from '../../app';


const io= new Server<ClientToServerEvents,ServerToClientEvents,SocketData>(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})
export default io;