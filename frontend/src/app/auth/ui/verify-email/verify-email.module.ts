import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyEmailComponent } from './verify-email.component';



@NgModule({
  declarations: [
    VerifyEmailComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    VerifyEmailComponent
  ]
})
export class VerifyEmailModule { }
