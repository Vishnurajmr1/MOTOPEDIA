import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http'
import { AuthAccessComponent } from './auth-access.component';
import { AuthAccessRoutingModule } from './auth-access-routing.module';
import { LoginFormModule } from '../../ui/login-form/login-form.module';
import { SignupFormModule } from '../../ui/signup-form/signup-form.module';
import { TabContainerModule } from '../../ui/tab-container/tab-container.module';
import {StoreModule} from '@ngrx/store'
import { authReducer } from '../../data-access/state/auth.reducer';
import { AuthService } from '../../data-access/auth.service';
import { SnackbarService } from 'src/app/shared/data-access/global/snackbar.service';
import { VerifyEmailModule } from '../../ui/verify-email/verify-email.module';
import { VerifyOtpModule } from '../../ui/verify-otp/verify-otp.module';
import { ForgotFormModule } from '../../ui/forgot-form/forgot-form.module';


@NgModule({
  declarations: [
    AuthAccessComponent
  ],
  imports: [
    CommonModule,
    AuthAccessRoutingModule,
    LoginFormModule,
    SignupFormModule,
    TabContainerModule,
    VerifyEmailModule,
    VerifyOtpModule,
    ForgotFormModule,
    StoreModule.forFeature('auth',authReducer)
  ],
})
export class AuthAccessModule { }
