import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/shared/types/response.interface';
@Injectable({
  providedIn: 'root',
})
export class ChatApiService {
  private http = inject(HttpClient);
  private chatApi = '/api/chat/';
  private chatMessageApi = '/api/messages/';
  getUserChats(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.chatApi}`);
  }
  createUserChat(receiverId: string): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${this.chatApi}c/${receiverId}`, {});
  }
  sendMessage(
    chatId: string,
    content: string,
    attachments?: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('content', content);
    if (attachments) {
      formData.append('image', attachments, attachments.name);
    }
    return this.http.post(`${this.chatMessageApi}${chatId}`, formData);
  }
  getChatMessages(chatId: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.chatMessageApi}${chatId}`);
  }

}
