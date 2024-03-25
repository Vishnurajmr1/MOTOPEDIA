import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionContainerComponent } from './subscription-container.component';
import { subscriptionContainerRoutingModule } from './subscription-container-routing.module';
import { SubscriptionListingModule } from '../../ui/subscription-listing/subscription-listing.module';

@NgModule({
  declarations: [SubscriptionContainerComponent],
  imports: [
    CommonModule,
    subscriptionContainerRoutingModule,
    SubscriptionListingModule,
  ],
  exports: [SubscriptionContainerComponent],
})
export class SubscriptionContainerModule {}
