import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotFormComponent } from './forgot-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ForgotFormComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule 
  ],
  exports:[ForgotFormComponent]
})
export class ForgotFormModule { }
