import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingPlansComponent } from './pricing-plans.component';



@NgModule({
  declarations: [
    PricingPlansComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PricingPlansComponent
  ]
})
export class PricingPlansModule { }
