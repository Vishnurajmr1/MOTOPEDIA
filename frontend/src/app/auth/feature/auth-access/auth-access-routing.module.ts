import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAccessComponent } from './auth-access.component';
import { LoginFormComponent } from '../../ui/login-form/login-form.component';
import { SignupFormComponent } from '../../ui/signup-form/signup-form.component';
import { VerifyEmailComponent } from '../../ui/verify-email/verify-email.component';
import { VerifyOtpComponent } from '../../ui/verify-otp/verify-otp.component';
import { verifyOTPGuard } from 'src/app/core/guard/verify-otp.guard';
import { ForgotFormComponent } from '../../ui/forgot-form/forgot-form.component';
import { resetPasswordGuard } from 'src/app/core/guard/reset-password.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthAccessComponent,
    children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'signup', component: SignupFormComponent },
      { path: 'verify', component: VerifyEmailComponent },
      {
        path: 'verify-otp',
        component: VerifyOtpComponent,
        canActivate: [verifyOTPGuard],
      },
      {
        path: 'reset-password/:token',
        component: ForgotFormComponent,
        // canActivate: [resetPasswordGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthAccessRoutingModule {}
