import { Component, inject } from '@angular/core';
import { Tab } from 'src/app/shared/types';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

import { ILogin, ISignUp } from 'src/app/shared/interfaces/Interface';
@Component({
  selector: 'app-auth-access',
  templateUrl: './auth-access.component.html',
  styleUrls: ['./auth-access.component.css'],
})
export class AuthAccessComponent {
  constructor() {
    this.setAuthTabFromRoute();
  }
  ngOnInit() {}
  protected TabType: typeof Tab = Tab;
  currentTab: Tab = Tab.Login;
  private routeSubscription!: Subscription;
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

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
  }

  loginFormSubmit(formData:ILogin){

  }
  signupFormSubmit(formData:ISignUp){

  }
}
