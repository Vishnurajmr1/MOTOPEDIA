import { Injectable, inject } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { BehaviorSubject, Observable, Subject, sample } from 'rxjs';
import { UserService } from '../../../app/riders/data-access/user.service';
import { ISocketEvents } from 'src/app/shared/types/socket.Interface';
import {
  ChatListItemInterface,
  ChatMessageInterface,
} from 'src/app/shared/types/chat.Interface';
import { ICurrentUser } from 'src/app/auth/data-access/state/auth.reducer';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private participantId = new BehaviorSubject<string>('');
  private currentUser = new BehaviorSubject<ICurrentUser | null>(null);
  private chatsSubject = new BehaviorSubject<ChatListItemInterface[]>([]);
  private setMessages = new Subject<ChatMessageInterface>();
  private setUnreadMessages = new BehaviorSubject<ChatMessageInterface[]>([]);
  private currentChat = new BehaviorSubject<ChatListItemInterface | null>(null);
  private setIsTyping: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private setSelfTyping: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private setMessage: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private setLocalSearchQuery: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private setAttachedFiles: BehaviorSubject<File[]> = new BehaviorSubject<
    File[]
  >([]);
  private chatHistory = new BehaviorSubject<any>([]);
  constructor() {
    this.socket = io('http://localhost:3000', {
      path: '/api/chat/socket.io',
      transports: ['websocket'],
      withCredentials: true,
      autoConnect: false,
    });
    this.socket.on(ISocketEvents.CONNECTED_EVENT, () => this.connect());
    this.socket.on(ISocketEvents.MESSAGE_RECEIVED_EVENT, (data) => {
      console.log(data)
      this.setMessages.next(data);
    });
    this.socket.on(ISocketEvents.DISCONNECT_EVENT, () => this.disconnect());
  }
  connect() {
    this.socket.connect();
  }
  addUser() {
    this.socket.emit(
      'addUser',
      this.getCurrentUserId(),
      // this.participantId.getValue()
    );
  }
  setCurrentParticipant(participantId: string) {
    this.participantId.next(participantId);
  }
  setCurrentUser(user: ICurrentUser) {
    this.currentUser.next(user);
  }
  getCurrentUserId() {
    return this.currentUser.getValue()?.userId;
  }
  getParticipantId() {
    return this.participantId.getValue();
  }
  getChatHistory(): Observable<any> {
    return this.chatHistory.asObservable();
  }
  getNewMessage() {
    return this.setMessages.asObservable();
  }
  updatedMessage(message: ChatMessageInterface) {
    console.log(message);
    this.setMessages.next(message);
  }
  setChatHistory(data: any) {
    this.chatHistory.next(data);
  }
  disconnect = () => {
    this.socket.disconnect();
  };

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
  setChatRoom(chatId: string) {
    this.socket.emit(ISocketEvents.JOIN_CHAT_EVENT, chatId);
  }
  UnreadMessages() {
    return this.setUnreadMessages.asObservable();
  }
  getParticipants() {
    this.socket.emit(ISocketEvents.NEW_CHAT_EVENT);
  }
}
