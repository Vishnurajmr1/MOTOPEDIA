import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { initFlowbite } from 'flowbite';
import { State, getCurrentUserData } from './auth/data-access/state';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { checkLocalStorageAction } from './auth/data-access/state/actions/auth-page.actions';
import { ICurrentUser } from './auth/data-access/state/auth.reducer';
import { SocketService } from './shared/data-access/global/socket.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'MOTOPEDIA';
  private store = inject(Store<State>);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private socket = inject(SocketService);
  currentLayout: string = 'user';
  private routeSubscription!: Subscription;
  protected currentUser!: ICurrentUser;
  currentUser$!: Observable<ICurrentUser>;
  private ngUnsubscribe$ = new Subject<void>();

  isSidebarOpen: boolean = true;
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  constructor() {
    this.currentUser$ = this.store.select(getCurrentUserData);
    this.currentUser$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      this.currentUser = res;
      this.initSocket();
    });
  }
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
    this.socket.disconnect();
  }

  private initSocket(): void {
    if (this.currentUser) {
      this.socket.connect();
      this.socket.setCurrentUser(this.currentUser);
      this.socket.addUser();
    }
  }
}
