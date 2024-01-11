export interface ServerToClientEvents {
    recieve_message: (data: any) => void;
    response_data: (data: any) => void;
}
export interface ClientToServerEvents {
    join_room: (data: string) => void;
    send_message: (data: { message: string }) => void;
    request_data: (data: any) => void;
    new_user_add:(userId:string)=>void;
}

export interface SocketData {
    userId: string;
}
