import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanType, SubscriptionType } from 'src/app/shared/types';
import {
  IGetSubscription,
  ISubscription,
} from 'src/app/shared/types/subscriptionInterface';

@Component({
  selector: 'pricing-plans',
  templateUrl: './pricing-plans.component.html',
  styleUrls: ['./pricing-plans.component.css'],
})
export class PricingPlansComponent {
  @Output() sub = new EventEmitter<IGetSubscription>();
  @Input() subscriptionPlans: IGetSubscription[] = [];
  Plan = PlanType;
  subscribe(plan: IGetSubscription) {
    this.sub.emit(plan);
  }
}
