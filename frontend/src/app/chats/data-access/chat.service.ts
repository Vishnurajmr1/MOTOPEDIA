import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor() { }
  private socket:io.Socket=io.connect('http://localhost:3000');

  sendMessages(message:string){
    this.socket.emit('new-message',message);
  }

  getMessages(){
    let observable=new Observable<{user:String,message:String}>(observer=>{
      this.socket.on('new-message',(data)=>{
        observer.next(data);
      })
      return ()=>{this.socket.disconnect()}
    })
    return observable;
  }
}
