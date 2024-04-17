import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IAddNotification,
  getAllNotificationsInterface,
} from '../../types/notification.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class notificationService {
  private http: HttpClient = inject(HttpClient);
  // private notificationApi = '/api/notification';
  private notificationApi =`${environment.apiUrl}/notification`;

  createNotification(notification: IAddNotification): Observable<any> {
    return this.http.post(`${this.notificationApi}/create`, notification);
  }
  getAllNotifications(): Observable<getAllNotificationsInterface> {
    return this.http.get<getAllNotificationsInterface>(
      `${this.notificationApi}`
    );
  }
  markAllNotificationAsRead(): Observable<any> {
    return this.http.put(`${this.notificationApi}`, {});
  }
}
