import { Component, inject } from '@angular/core';
import { Tab } from 'src/app/shared/types';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import {
  IConfirmPass,
  ILogin,
  ISignUp,
  IverifyOtp,
  UserDoc,
} from '../../../../app/shared/types/user.Interface';
import { Store } from '@ngrx/store';
import { State } from '../../data-access/state';
import { AuthService } from '../../data-access/auth.service';
import { SnackbarService } from '../../../../app/shared/data-access/global/snackbar.service';
import { LocalStorageService } from 'src/app/shared/data-access/global/local-storage.service';
import { AuthPageActions } from '../../data-access/state/actions';
import { ICurrentUser } from '../../data-access/state/auth.reducer';
import { userAccess, userRefresh } from '../../../../const';
@Component({
  selector: 'app-auth-access',
  templateUrl: './auth-access.component.html',
  styleUrls: ['./auth-access.component.css'],
})
export class AuthAccessComponent {
  constructor() {
    this.setAuthTabFromRoute();
  }
  protected TabType: typeof Tab = Tab;
  currentTab: Tab = Tab.Login;
  private routeSubscription!: Subscription;
  private socialAuthSubscription!: Subscription;
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store<State>);
  private authService = inject(AuthService);
  private snackbar = inject(SnackbarService);
  private localstorageService = inject(LocalStorageService);

  selectedTab(tab: Tab) {
    this.currentTab = tab;
    this.router.navigate([tab], { relativeTo: this.activatedRoute });
  }
  private setAuthTabFromRoute(): void {
    let url = window.location.pathname;
    const path = url.split('/');
    this.processUrlSegments(path);

    this.routeSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const segments = event.url.split('/');
        this.processUrlSegments(segments);
      });
  }

  private processUrlSegments(segments: string[]) {
    if (segments.length > 2) {
      const secondSegment = segments[2];
      switch (secondSegment) {
        case this.TabType.Login:
          this.currentTab = this.TabType.Login;
          break;
        case this.TabType.Signup:
          this.currentTab = this.TabType.Signup;
          break;
        case this.TabType.VerifyOtp:
          this.currentTab = this.TabType.VerifyOtp;
          break;
        case this.TabType.Verify:
          this.currentTab = this.TabType.Verify;
          break;
        case this.TabType.Reset:
          this.currentTab = this.TabType.Reset;
          break;
      }
    } else {
      // this.selectedTab(this.TabType.Login);
    }
    // this.dispatchAuthTabChange();
  }

  private dispatchAuthTabChange(): void {
    this.store.dispatch(
      AuthPageActions.toggleCurrentTab({ currentAuthTab: this.currentTab })
    );
  }


  loginFormSubmit(formData: ILogin) {
    this.authService.login(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.snackbar.showSuccess('Login Successfull');
        let currentUser: ICurrentUser = {
          userId:res.data.user._id,
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          email: res.data.user.email,
          isVerifiedEmail: res.data.user.isVerifiedEmail,
          mobile: res.data.user.mobile,
          isBlocked: false,
        };

        this.store.dispatch(
          AuthPageActions.setAccessToken({
            accessToken: res.data.accessToken,
            tokenType: 'access_token',
          })
        );
        localStorage.setItem(userAccess, res.data.accessToken);
        this.store.dispatch(AuthPageActions.setCurrentUser({ currentUser }));
      },
    });
  }
  signupFormSubmit(formData: ISignUp) {
    this.authService.signup(formData).subscribe({
      next: (res) => {
        console.log(res);
        const currentUser = {
          firstName: res.data.userData.firstName,
          email: res.data.userData.email,
          lastName: res.data.userData.lastName,
          mobile: res.data.userData.mobile,
          isVerifiedEmail: res.data.userData.isVerifiedEmail,
          isBlocked: res.data.userData.isBlocked,
          userId:res.data.userData._id
        };
        this.store.dispatch(AuthPageActions.setCurrentUser({ currentUser }));
        this.snackbar.showSuccess(res.message);
        this.router.navigateByUrl('/auth/verify-otp');
      },
    });
  }
  verifyOtpSubmit(otpSubmission: IverifyOtp) {
    const email = this.localstorageService.get('email');
    console.log(email);
    if (email) {
      otpSubmission.email = email;
    }
    this.authService.verifyOtp(otpSubmission).subscribe({
      next: (res) => {
        console.log(res);
        this.store.dispatch(
          AuthPageActions.setAccessToken({
            accessToken: res.data.accessToken,
            tokenType: 'access_token',
          })
        );
        this.snackbar.showSuccess('Login Successfully');
        const currentUser: ICurrentUser = {
          firstName: res.data.user.firstName,
          email: res.data.user.email,
          lastName: res.data.user.lastName,
          isVerifiedEmail: res.data.user.isVerifiedEmail,
          mobile: res.data.user.mobile,
          isBlocked: res.data.user.isBlocked,
          userId:res.data.user._id
        };
        this.store.dispatch(AuthPageActions.setCurrentUser({ currentUser }));
        this.router.navigateByUrl('home');
      },
    });
  }

  resentOtp() {
    const email = this.localstorageService.get('email');
    if (email) {
      this.authService.resentOtp({ email }).subscribe({
        next: (res) => {
          console.log(res);
          this.snackbar.showSuccess(res.message);
        },
      });
    } else {
      this.snackbar.showError('Oops Something went wrong!Please signup again');
    }
  }
  resetPassFormSubmit(email: { email: string }) {
    this.authService.forgotPass(email).subscribe({
      next: (res) => {
        console.log(res);
        this.snackbar.showSuccess(res.message);
        this.router.navigateByUrl('/auth/login');
      },
    });
  }

  verifyForgotFormSubmit(data: IConfirmPass) {
    this.authService.confirmPassword(data).subscribe({
      next: () => {
        this.snackbar.showSuccess(
          'Password reset successfully,Please login again'
        );
        this.router.navigateByUrl('/auth/login');
      },
    });
  }

  ngOnDestory(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.socialAuthSubscription) {
      this.socialAuthSubscription.unsubscribe();
    }
  }
}
