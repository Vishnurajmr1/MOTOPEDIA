import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private http = inject(HttpClient);
  private api = '/api/user/payment';
  constructor() {}

  createSubscription(plan: string) {
    return this.http.post(`${this.api}/stripe-order`, { plan });
  }

  updateSubscription(data: any) {
    return this.http.post(`${this.api}/stripe-verification`, { data });
  }
  subscriptionPaymentFailed(data: any) {
    return this.http.post(`${this.api}/payment/failed`, { data });
  }

}
