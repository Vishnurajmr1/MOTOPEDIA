import { Injectable, inject } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { BehaviorSubject, Observable, sample } from 'rxjs';
import { UserService } from '../../../app/riders/data-access/user.service';
import { ISocketEvents } from 'src/app/shared/types/socket.Interface';
import {
  ChatListItemInterface,
  ChatMessageInterface,
} from 'src/app/shared/types/chat.Interface';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private participantId = new BehaviorSubject<string>('');
  private currentUserId = new BehaviorSubject<string>('');
  private chatsSubject = new BehaviorSubject<ChatListItemInterface[]>([]);
  private setMessages = new BehaviorSubject<ChatMessageInterface[]>([]);
  private setUnreadMessages = new BehaviorSubject<ChatMessageInterface[]>([]);
  private currentChat=new BehaviorSubject<ChatListItemInterface|null>(null);
  private setIsTyping: BehaviorSubject<boolean> = 
    new BehaviorSubject<boolean>(false);
  private setSelfTyping: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private setMessage: BehaviorSubject<string> = 
    new BehaviorSubject<string>('');
  private setLocalSearchQuery: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private setAttachedFiles: BehaviorSubject<File[]> = 
    new BehaviorSubject<File[]>([]);
  private chatHistory = new BehaviorSubject<any>([]);
  constructor() {
    this.socket = io('http://localhost:3000', {
      path: '/api/chat/socket.io',
      transports: ['websocket'],
      withCredentials: true,
      autoConnect: false,
    });
    this.socket.on(ISocketEvents.CONNECTED_EVENT,()=>this.connect());
    this.socket.on('getUsers', (data: any) => {
      console.log('active sockets', data);
    });
    this.socket.on('receiveMessage', (message) => {
      console.log(message, 'message recieved');
      if (
        message.participantId === this.participantId.getValue() ||
        message.currentUserId === this.participantId.getValue()
      ) {
        const history = this.chatHistory.getValue();
        console.log(history);
        this.setChatHistory({
          participant: history.participant,
          messages: [...history.messages, message.result],
        });
      }
    });
    this.socket.on(ISocketEvents.DISCONNECT_EVENT,()=>this.disconnect());
  }

  connect(){
    this.socket.connect();
  }
  addUser() {
    this.socket.emit('addUser', this.currentUserId.getValue());
  }
  setCurrentParticipant(participantId: string) {
    this.participantId.next(participantId);
  }
  setCurrentUser(user: string) {
    this.currentUserId.next(user);
  }
  getCurrentUserId() {
    return this.currentUserId.getValue();
  }
  getChatHistory(): Observable<any> {
    return this.chatHistory.asObservable();
  }
  sendMessage(message: string) {
    const participantId = this.participantId.getValue();
    const senderId = this.currentUserId.getValue();
    const data = {
      recipient: participantId,
      sender: senderId,
      text: message,
    };
    this.socket.emit('new-message', data);
  }
  setChatHistory(data: any) {
    this.chatHistory.next(data);
  }
  disconnect=()=>{
    this.socket.disconnect();
  }

  updateChatLastMessage(chatToUpdateId: string, message: ChatMessageInterface) {
    const currentChats = this.chatsSubject.getValue();
    const chatIndex = currentChats.findIndex(
      (chat) => chat._id === chatToUpdateId
    );
    if (chatIndex !== -1) {
      const updatedChat = { ...currentChats[chatIndex] };

      updatedChat.lastMessage = message;
      updatedChat.updatedAt = message.updatedAt;

      currentChats[chatIndex] = updatedChat;

      this.chatsSubject.next(currentChats);
    }
  }
  getMessages(){
    this.socket.emit(ISocketEvents.JOIN_CHAT_EVENT,this.currentChat.asObservable())
  }
  UnreadMessages(){
   const unreadMessages=this.setUnreadMessages.getValue();
   unreadMessages.filter((msg)=>msg.chat!==this.currentChat.getValue()?._id)
  }
  getParticipants(){
    this.socket.emit(ISocketEvents.NEW_CHAT_EVENT)
  }
}
