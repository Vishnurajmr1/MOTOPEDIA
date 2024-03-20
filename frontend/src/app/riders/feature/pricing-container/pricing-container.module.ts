import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingContainerRoutingModule } from './pricing-container-routing.module';
import { PricingContainerComponent } from './pricing-container.component';
import { PricingPlansModule } from '../../ui/pricing-plans/pricing-plans.module';


@NgModule({
  declarations: [
    PricingContainerComponent
  ],
  imports: [
    CommonModule,
    PricingContainerRoutingModule,
    PricingPlansModule
  ]
})
export class PricingContainerModule { }
