import { Injectable, inject } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { BehaviorSubject, Observable, Subject, sample } from 'rxjs';
import { ISocketEvents } from '../../types/socket.Interface';
import {
  ChatListItemInterface,
  ChatMessageInterface,
  VideoMessage,
} from '../../../../app/shared/types/chat.Interface';
import { ICurrentUser } from '../../../auth/data-access/state/auth.reducer';
import { NotificationInterface } from '../../types/notification.interface';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
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
  private getNotification = new Subject<NotificationInterface>();
  private getVideoMessages = new Subject<any>();
  private messagesSubject = new Subject<VideoMessage>();
  public messages$ = this.messagesSubject.asObservable();
  constructor() {
    this.socket = io('http://localhost:3000', {
      path: '/api/chat/socket.io',
      transports: ['websocket'],
      withCredentials: true,
      autoConnect: false,
    });
    this.socket.on(ISocketEvents.CONNECTED_EVENT, () => this.connect());
    this.socket.on(ISocketEvents.MESSAGE_RECEIVED_EVENT, (data) => {
      this.setMessages.next(data);
    });
    this.socket.on(ISocketEvents.NOTIFICATION_RECEIVED_EVENT, (data) => {
      console.log(data);
      this.getNotification.next(data);
    });
    this.socket.on(ISocketEvents.VIDEO_CALL_RECEIVED_EVENT, (data) => {
      console.log('received message from the socket' + data);
      this.getVideoMessages.next(data);
      // this.messagesSubject.next(data);
    });
    this.socket.on(ISocketEvents.DISCONNECT_EVENT, () => this.disconnect());
  }
  connect() {
    this.socket.connect();
  }
  addUser() {
    this.socket.emit('addUser', this.getCurrentUserId());
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
  getNewVideoMessages(): Observable<any> {
    return this.getVideoMessages.asObservable();
  }
  updatedMessage(message: ChatMessageInterface) {
    console.log(message);
    this.setMessages.next(message);
  }
  setChatHistory(data: any) {
    this.chatHistory.next(data);
  }
  getNotifications() {
    return this.getNotification.asObservable();
  }
  sendVideoMessages(payload: any): void {
    this.socket.emit(ISocketEvents.CREATE_VIDEO_CALL, payload);
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
  sendVideoMessage(msg: VideoMessage) {
    const participant=this.getParticipantId()
    console.log('sending Video message' + msg.type);
    console.log(this.getParticipantId.toString(),msg)
    this.socket.emit(ISocketEvents.CREATE_VIDEO_CALL,msg,participant);
  }
}
