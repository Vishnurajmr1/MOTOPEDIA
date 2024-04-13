import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormComponent } from './signup-form.component';
import {ReactiveFormsModule} from '@angular/forms';
// import { GoogleSigninButtonDirective, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SignupFormComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,
    RouterModule
    // GoogleSigninButtonModule,
  ],
  exports:[
    SignupFormComponent
  ],
  // providers:[
  //   GoogleSigninButtonDirective
  // ]
})
export class SignupFormModule { }
