import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionModalComponent } from './subscription-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [SubscriptionModalComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SubscriptionModalComponent],
})
export class SubscriptionModalModule {}
