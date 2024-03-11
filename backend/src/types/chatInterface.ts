export interface IChat{
    name?:string;
    isGroupChat?:boolean;
    lastMessage?:string;
    participants?:[string];
    admin?:string;
}
