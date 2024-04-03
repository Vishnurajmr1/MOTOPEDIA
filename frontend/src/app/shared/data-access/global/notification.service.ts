import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAddNotification } from '../../types/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class notificationService {
  private http: HttpClient = inject(HttpClient);
  private notificationApi = '/api/notification';

  createNotification(notification: IAddNotification): Observable<any> {
    return this.http.post(`${this.notificationApi}/create`, notification);
  }
}
