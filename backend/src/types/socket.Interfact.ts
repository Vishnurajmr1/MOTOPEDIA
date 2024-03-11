import { Socket } from "socket.io";
import { UserInterface } from "./userInterface";

export interface ServerToClientEvents {
    recieve_message: (data: any) => void;
    response_data: (data: any) => void;
    getUsers:(data:any)=>void;
}
export interface ClientToServerEvents {
    addUser:(userId:string)=>void;
    join_room: (data: string) => void;
    send_message: (data: { message: string }) => void;
    request_data: (data: any) => void;
    new_user_add:(userId:string)=>void;
}

export interface SocketData {
    userId: string;
}


export interface customSocket extends Socket{
   user:UserInterface
}