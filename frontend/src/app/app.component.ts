import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { initFlowbite } from 'flowbite';
import { State } from './auth/data-access/state';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { checkLocalStorageAction } from './auth/data-access/state/actions/auth-page.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private store = inject(Store<State>);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  currentLayout: string = 'user';
  private routeSubscription!: Subscription;
  ngOnInit(): void {
    initFlowbite();

    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route.firstChild.data.subscribe((data) => {
            if (data['layout']) {
              this.currentLayout = data['layout'];
            } else {
              this.currentLayout = 'user';
            }
          });
          route = route.firstChild;
        }
      }
    });
    this.store.dispatch(checkLocalStorageAction());
    console.log(this.currentLayout);
  }
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
