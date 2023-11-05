import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthAccessComponent } from './auth-access.component';
import { AuthAccessRoutingModule } from './auth-access-routing.module';
import { LoginFormModule } from '../../ui/login-form/login-form.module';
import { SignupFormModule } from '../../ui/signup-form/signup-form.module';
import { TabContainerModule } from '../../ui/tab-container/tab-container.module';



@NgModule({
  declarations: [
    AuthAccessComponent
  ],
  imports: [
    CommonModule,
    AuthAccessRoutingModule,
    LoginFormModule,
    SignupFormModule,
    TabContainerModule
  ]
})
export class AuthAccessModule { }
