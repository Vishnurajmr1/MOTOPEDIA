import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Stripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private http = inject(HttpClient);
  private api = '/api/payment';
  
  constructor() {
  }
  createSubscription(plan: string) {
    return this.http.post(`${this.api}/stripe-order`, { plan });
  }
  createSession(data: any){
    return this.http.post(`${this.api}/create-checkout-session`, data);
  }
  updateSubscription(data: any) {
    return this.http.post(`${this.api}/stripe-verification`, { data });
  }
  subscriptionPaymentFailed(data: any) {
    return this.http.post(`${this.api}/payment/failed`, { data });
  }
}
