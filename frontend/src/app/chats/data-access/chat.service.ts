import { Injectable, inject } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private participantId = new BehaviorSubject<string>('');
  private currentUserId = new BehaviorSubject<string>('');
  private chatHistory = new BehaviorSubject<any>([]);
  constructor() {
    this.socket = io('http://localhost:3000',{
      path:'/api/chat/socket.io',
      transports:['websocket'],
      withCredentials:true,
      autoConnect:false,
    });
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
        this.setChatHistory({
          participant: history.participant,
          messages: [...history.message, message.result],
        });
      }
    });
  }
  connect() {
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
  disconnect() {
    this.socket.disconnect();
  }
  setChatHistory(data: any) {
    this.chatHistory.next(data);
  }


  // getMessages(){
  //   let observable=new Observable<{user:String,message:String}>(observer=>{
  //     this.socket.on('new-message',(data)=>{
  //       observer.next(data);
  //     })
  //     return ()=>{this.socket.disconnect()}
  //   })
  //   return observable;
  // }
 
}
