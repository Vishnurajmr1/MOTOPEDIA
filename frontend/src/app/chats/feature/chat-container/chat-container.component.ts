import { Component, inject } from '@angular/core';
import { ChatService } from '../../data-access/chat.service';
import { Socket,io } from 'socket.io-client';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css']
})
export class ChatContainerComponent {
  // private socket:Socket;
  // constructor(){
  //   this.socket = io('ws://localhost:3000',{
  //     path:'/api/chat/socket.io',
  //     transports:['websocket'],
  //     withCredentials:true,
  //     autoConnect:false,
  //   });
  //   this.socket.connect();
  // }
  private chatService=inject(ChatService);
  getChat=this.chatService.connect();
}
