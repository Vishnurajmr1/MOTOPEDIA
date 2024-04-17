import { Injectable } from '@angular/core';
import { Stripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { PaymentService } from './payment.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  stripePromise: Promise<Stripe>;
  session: any;

  constructor(private paymentService: PaymentService) {
    this.stripePromise = this.loadStripe();
  }
  private loadStripe(): Promise<Stripe> {
    return (window as any).Stripe(environment.stripeKey);
  }

  async redirectToCheckout(data: any): Promise<void> {
    const stripe = await this.stripePromise;
    this.paymentService
      .createSession(data)
      .pipe(
        switchMap((response:any) => {
              this.session = response.data;
          return stripe.redirectToCheckout({
            sessionId: this.session,
          });
        })
      )
      .subscribe((result) => {
        console.log(result);
        if (result.error) {
          console.log(result.error);
        }
      });
  }
}
