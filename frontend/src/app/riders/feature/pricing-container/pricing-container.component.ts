import { Component, ViewChild, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  State,
  getCurrentUserData,
  isUserLoggedIn,
} from '../../../auth/data-access/state';
import { SnackbarService } from '../../../../app/shared/data-access/global/snackbar.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { StripeCardComponent } from 'ngx-stripe';
import {
  Stripe,
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { SubscriptionService } from '../../../../app/shared/data-access/global/subscription.service';
import {
  IGetSubscription,
  ISubscription,
} from 'src/app/shared/types/subscriptionInterface';
import { PaymentService } from '../../data-access/payment.service';
import { environment } from '../../../../environments/environment';
import { StripeService } from '../../data-access/stripe.service';

@Component({
  selector: 'app-pricing-container',
  templateUrl: './pricing-container.component.html',
  styleUrls: ['./pricing-container.component.css'],
})
export class PricingContainerComponent {
  private store = inject(Store<State>);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  private subService = inject(SubscriptionService);
  private isLoggedIn: boolean = false;
  private stripeService = inject(StripeService);
  private paymentService = inject(PaymentService);
  stripePromise: Promise<Stripe> | undefined;
  subscriptionData: IGetSubscription[] = [];
  customerID: string = '';
  stripeBox: boolean = false;
  constructor() {}
  ngOnInit(): void {
    this.store.select(isUserLoggedIn).subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.subService.getSubscriptionList().subscribe((result) => {
      this.subscriptionData = result.data.filter(
        (item: IGetSubscription) => item.isActive === true
      );
    });
  }
  card: StripeCardComponent | undefined;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };
  elementOptions: StripeElementsOptions = {
    locale: 'en',
  };
  async payNow(plan: IGetSubscription) {
    console.log(plan);
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/auth/login');
      this.snackbar.showError('Please login');
      return;
    } else {
      this.store.select(getCurrentUserData).subscribe((result) => {
        console.log(result)
        this.customerID = result.userId;
      });
      this.stripeBox = true;
      this.redirectToCheckout(plan.stripePriceId);
    }
  }

  async redirectToCheckout(priceId: string) {
    console.log(priceId);
    let model = {
      priceId: priceId,
    };
    console.log(model);

    await this.stripeService.redirectToCheckout(model);
  }
}
