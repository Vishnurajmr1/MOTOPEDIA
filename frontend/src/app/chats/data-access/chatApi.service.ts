import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ChatApiService {
  private http = inject(HttpClient);
  private chatApi = '/api/chat';
  getApiChatHistory(participantId: string) {
    return this.http.get(`${this.chatApi}/history/${participantId}`);
  }
}
