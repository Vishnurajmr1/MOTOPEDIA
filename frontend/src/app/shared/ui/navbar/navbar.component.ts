import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  State,
  getCurrentUserData,
  isUserLoggedIn,
} from 'src/app/auth/data-access/state';
import { unSetCurrentUser } from 'src/app/auth/data-access/state/actions/auth-page.actions';
import { ICurrentUser } from 'src/app/auth/data-access/state/auth.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  currentUser$!: Observable<ICurrentUser>;
  isUserLoggedIn$!: Observable<boolean>;
  openSearchBar:boolean=false;

  constructor(private store: Store<State>,private router:Router) {
    this.currentUser$ = this.store.select(getCurrentUserData);
    this.isUserLoggedIn$ = this.store.select(isUserLoggedIn);
  }
  isDropDownMenu = false;
  toggleProfileDropDown() {
    this.isDropDownMenu = !this.isDropDownMenu;
  }

  logout(): void {
    this.store.dispatch(unSetCurrentUser());
    this.router.navigateByUrl('/');
  }
  showSearchComponent(){
    this.openSearchBar=!this.openSearchBar;
  }
}
