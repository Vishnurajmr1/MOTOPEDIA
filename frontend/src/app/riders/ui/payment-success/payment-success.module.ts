import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentSuccessComponent } from './payment-success.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PaymentSuccessComponent],
  imports: [CommonModule,RouterModule],
  exports: [PaymentSuccessComponent],
})
export class PaymentSuccessModule {}
