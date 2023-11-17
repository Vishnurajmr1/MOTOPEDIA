import { Component, inject } from '@angular/core';
import { Tab } from 'src/app/shared/types';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { ILogin, ISignUp, UserDoc } from 'src/app/shared/interfaces/Interface';
import { Store } from '@ngrx/store';
import { State } from '../../data-access/state';
import { AuthService } from '../../data-access/auth.service';
import { SnackbarService } from 'src/app/shared/data-access/global/snackbar.service';
import { LocalStorageService } from 'src/app/shared/data-access/global/local-storage.service';
import { AuthPageActions } from '../../data-access/state/actions';
@Component({
  selector: 'app-auth-access',
  templateUrl: './auth-access.component.html',
  styleUrls: ['./auth-access.component.css'],
})
export class AuthAccessComponent {
  constructor() {
    this.setAuthTabFromRoute();
  }
  ngOnInit() {
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe()
    }
  }
  protected TabType: typeof Tab = Tab;
  currentTab: Tab = Tab.Login;
  private routeSubscription!: Subscription;
  private socialAuthSubscription!:Subscription;
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private store=inject(Store<State>);
  private authService=inject(AuthService);
  private snackbar=inject(SnackbarService)
  private localstorageService=inject(LocalStorageService);

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
      }
    } else {
      this.selectedTab(this.TabType.Login);
    }
    this.dispatchAuthTabChange()
  }

  private dispatchAuthTabChange():void{
    this.store.dispatch(AuthPageActions.toggleCurrentTab({currentAuthTab:this.currentTab}))
  }

  loginFormSubmit(formData: ILogin) {
  }
  signupFormSubmit(formData: ISignUp) {
    console.log(formData);
    this.authService.signup(formData).subscribe({
      next:(res)=>{
        console.log(res);
        const currentUser={
          firstName:res.userData.firstName,
          email: res.userData.email,
          lastName: res.userData.lastName,
          mobile: res.userData.mobile,
          isVerifiedEmail:res.userData.isVerifiedEmail,
          isBlocked:res.userData.isBlocked
        }
        console.log(currentUser)
        this.store.dispatch(AuthPageActions.setCurrentUser({currentUser}))
        this.snackbar.showSuccess(res.message);
        this.router.navigateByUrl('auth/login');
      }
    })
  }
}
