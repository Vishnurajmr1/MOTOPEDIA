import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ISubscription } from '../../types/subscriptionInterface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private http: HttpClient = inject(HttpClient);
  // private subscriptionApi = '/api/subscription';
  private subscriptionApi = `${environment.apiUrl}/subscription`;

  getSubscriptionList(): Observable<any> {
    return this.http.get(`${this.subscriptionApi}`);
  }
  createSubscription(subData: ISubscription): Observable<any> {
    return this.http.post(`${this.subscriptionApi}`, subData);
  }
}
