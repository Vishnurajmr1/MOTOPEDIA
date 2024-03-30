import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PricingContainerComponent } from './pricing-container.component';
import { PaymentSuccessComponent } from '../../ui/payment-success/payment-success.component';

const routes: Routes = [
  {
    path: '',
    component: PricingContainerComponent,
  },
  {
    path: 'checkout-success',
    component: PaymentSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricingContainerRoutingModule {}
