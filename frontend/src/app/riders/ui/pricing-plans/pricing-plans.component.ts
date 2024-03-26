import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlanType, SubscriptionType } from 'src/app/shared/types';
import { ISubscription } from 'src/app/shared/types/subscriptionInterface';

@Component({
  selector: 'pricing-plans',
  templateUrl: './pricing-plans.component.html',
  styleUrls: ['./pricing-plans.component.css'],
})
export class PricingPlansComponent {
  @Output() sub = new EventEmitter<ISubscription>();
  @Input() subscriptionPlans: ISubscription[] = [];
  Plan = PlanType;
  subscribe(plan: ISubscription) {
    this.sub.emit(plan);
  }
}
