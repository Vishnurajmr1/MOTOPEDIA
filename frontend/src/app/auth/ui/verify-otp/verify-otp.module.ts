import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyOtpComponent } from './verify-otp.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VerifyOtpComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[VerifyOtpComponent]
})
export class VerifyOtpModule { }
