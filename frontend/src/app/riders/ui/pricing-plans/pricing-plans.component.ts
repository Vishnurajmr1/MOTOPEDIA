import { Component, EventEmitter, Output } from '@angular/core';
import { PlanType } from 'src/app/shared/types';

@Component({
  selector: 'pricing-plans',
  templateUrl: './pricing-plans.component.html',
  styleUrls: ['./pricing-plans.component.css'],
})
export class PricingPlansComponent {
  @Output() sub = new EventEmitter<PlanType>();
  Plan = PlanType;
  subscribe(plan: PlanType) {
    this.sub.emit(plan);
  }
}
