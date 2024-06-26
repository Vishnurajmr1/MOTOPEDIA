import { ElementRef } from '@angular/core';
import { IUserDetails } from './user.Interface';

export interface ChatListItemInterface {
  admin: string;
  createdAt: string;
  isGroupChat: true;
  lastMessage?: ChatMessageInterface;
  name: string;
  participants: IUserDetails[];
  updatedAt: string;
  _id: string;
  unreadCount?:number;
}

export interface ChatMessageInterface {
  _id: string;
  sender: Pick<
    IUserDetails,
    '_id' | 'profilePic' | 'email' | 'firstName' | 'lastName'
  >;
  content: string;
  chat: string;
  attachements: {
    file: {
      name: string;
      key: string;
      _id: string;
    };
    url: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}


export interface VideoCallEvent{
  chatId:string;
  remoteVideoRef:ElementRef<HTMLVideoElement>
}
export interface VideoMessage{
  type:string;
  data:any;
}