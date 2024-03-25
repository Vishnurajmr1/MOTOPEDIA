import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionListingComponent } from './subscription-listing.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { SubscriptionModalModule } from '../subscription-modal/subscription-modal.module';

@NgModule({
  declarations: [SubscriptionListingComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    SubscriptionModalModule,
  ],
  exports: [SubscriptionListingComponent],
})
export class SubscriptionListingModule {}
