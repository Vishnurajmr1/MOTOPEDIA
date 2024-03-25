import { Component, EventEmitter, Inject, Output, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubscriptionType } from '../../../shared/types/index';
import { ISubscription } from 'src/app/shared/types/subscriptionInterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/shared/data-access/global/utlis.service';

@Component({
  selector: 'subscription-modal',
  templateUrl: './subscription-modal.component.html',
  styleUrls: ['./subscription-modal.component.css'],
})
export class SubscriptionModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  private fb = inject(FormBuilder);
  public dialogRef: MatDialogRef<SubscriptionModalComponent> | undefined;
  subscriptionType = SubscriptionType;
  selectedSubscriptionType!: SubscriptionType;
  @Output() subscripitonCreated = new EventEmitter<ISubscription>();

  subscriptionForm = this.fb.group({
    name: ['', [Validators.required, UtilsService.noWhiteSpaceValidator()]],
    description: [
      '',
      [Validators.required, UtilsService.noWhiteSpaceValidator()],
    ],
    features: [[''], Validators.required],
    duration: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    isActive: [true],
  });

  get subscriptionFormControl() {
    return this.subscriptionForm.controls;
  }
  onSubscriptionTypeChange(event: any) {
    this.selectedSubscriptionType = event.value;
  }
  onSubmit(): void {
    console.log(this.subscriptionForm.value);
    if (this.subscriptionForm.valid) {
      const subscriptionData: ISubscription = {
        name: this.subscriptionForm.value.name as string,
        description: this.subscriptionForm.value.description as string,
        features: this.subscriptionForm.value.features || [],
        price: this.subscriptionForm.value.price as number,
        duration: this.subscriptionForm.value.duration as SubscriptionType,
        isActive: this.subscriptionForm.value.isActive as boolean,
      };
      this.subscripitonCreated.emit(subscriptionData);
      this.dialogRef?.close(subscriptionData);
    }
  }
}
