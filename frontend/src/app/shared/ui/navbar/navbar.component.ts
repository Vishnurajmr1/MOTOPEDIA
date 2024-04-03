import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  State,
  getCurrentUserData,
  isUserLoggedIn,
} from 'src/app/auth/data-access/state';
import { unSetCurrentUser } from 'src/app/auth/data-access/state/actions/auth-page.actions';
import { ICurrentUser } from 'src/app/auth/data-access/state/auth.reducer';
import { SocketService } from '../../data-access/global/socket.service';
import { notificationService } from '../../data-access/global/notification.service';
import { NotificationInterface } from '../../types/notification.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  currentUser$!: Observable<ICurrentUser>;
  isUserLoggedIn$!: Observable<boolean>;
  openSearchBar: boolean = false;
  showNotification: boolean = false;
  showNotificationCount: number = 0;
  private notificationSubscription: Subscription = new Subscription();
  private notificationService = inject(notificationService);
  getAllNotifications: NotificationInterface[] = [];
  constructor(
    private store: Store<State>,
    private router: Router,
    private socket: SocketService
  ) {
    this.currentUser$ = this.store.select(getCurrentUserData);
    this.isUserLoggedIn$ = this.store.select(isUserLoggedIn);
    this.notificationSubscription = this.socket
      .getNotifications()
      .subscribe((res) => {
        this.showNotificationCount++;
      });
  }
  ngOnInit(): void {
    this.isUserLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.showUnreadNotificationCount();
      } else {
        this.showNotificationCount = 0;
      }
    });
  }
  showUnreadNotificationCount(): void {
    // Subscribe to changes in the unread notification count
    this.notificationSubscription = this.notificationService
      .getAllNotifications()
      .subscribe((notifications) => {
        console.log(notifications);
        this.showNotificationCount += notifications.data.filter(
          (notification: NotificationInterface) => !notification.readBy
        ).length;
      });
    console.log(this.showNotificationCount);
  }

  isDropDownMenu = false;
  toggleProfileDropDown() {
    this.isDropDownMenu = !this.isDropDownMenu;
  }

  logout(): void {
    this.store.dispatch(unSetCurrentUser());
    this.router.navigateByUrl('/');
  }
  showSearchComponent() {
    this.openSearchBar = !this.openSearchBar;
  }

  showNotificationComponent() {
    this.showNotification = !this.showNotification;
    if (this.showNotification) {
      this.notificationSubscription = this.notificationService
        .getAllNotifications()
        .subscribe((notifications) => {
          this.getAllNotifications = notifications.data;
        });
    }
  }

  ngOnDestroy(): void {
    this.notificationSubscription.unsubscribe();
  }
}
