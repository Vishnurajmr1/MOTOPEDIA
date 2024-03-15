import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ChatApiService {
  private http = inject(HttpClient);
  private chatApi = '/api/chat/';
  private chatMessageApi = '/api/messages/';
  getApiChatHistory(participantId: string) {
    return this.http.get(`${this.chatApi}history/${participantId}`);
  }
  getUserChats(): Observable<any> {
    return this.http.get(`${this.chatApi}`);
  }
  createUserChat(receiverId: string): Observable<any> {
    return this.http.post(`${this.chatApi}c/${receiverId}`, {});
  }
  getChatMessages(chatId: string): Observable<any> {
    return this.http.get(`${this.chatMessageApi}${chatId}`);
  }
  sendMessage(
    chatId: string,
    content: string,
    attachments: File
  ): Observable<any> {
    const formData = new FormData();
    if (content) {
      formData.append('content', content);
    }
    formData.append('image', attachments);
    return this.http.post(`${this.chatMessageApi}${chatId}`, formData);
  }
}
