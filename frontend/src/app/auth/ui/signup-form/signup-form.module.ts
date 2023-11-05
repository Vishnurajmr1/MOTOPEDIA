import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormComponent } from './signup-form.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    SignupFormComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  exports:[
    SignupFormComponent
  ]
})
export class SignupFormModule { }
