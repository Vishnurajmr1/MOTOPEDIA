import { Component, ViewChild, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, isUserLoggedIn } from '../../../auth/data-access/state';
import { SnackbarService } from '../../../../app/shared/data-access/global/snackbar.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { SubscriptionService } from '../../../../app/shared/data-access/global/subscription.service';
import { ISubscription } from 'src/app/shared/types/subscriptionInterface';

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
  subscriptionData: ISubscription[] = [];
  customerID: string = '';
  ngOnInit(): void {
    this.store.select(isUserLoggedIn).subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    this.subService.getSubscriptionList().subscribe((result) => {
      this.subscriptionData = result.data.filter(
        (item: ISubscription) => item.isActive === true
      );
    });
  }
  @ViewChild(StripeCardComponent)
  card!: StripeCardComponent;
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
  payNow(plan: string) {
    console.log(plan);
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('/auth/login');
      this.snackbar.showError('Please login');
      return;
    }
  }

  stripePaymentForm = new FormGroup({
    email: new FormControl(''),
  });
  onSubmit() {}
  createToken() {}
}
