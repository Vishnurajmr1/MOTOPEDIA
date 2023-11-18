import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State, getCurrentUserData, isUserLoggedIn } from 'src/app/auth/data-access/state';
import { unSetCurrentUser } from 'src/app/auth/data-access/state/actions/auth-page.actions';
import { ICurrentUser } from 'src/app/auth/data-access/state/auth.reducer';
import { LocalStorageService } from '../../data-access/global/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // currentUser$!: Observable<ICurrentUser>;
  isUserLoggedIn$!:Observable<boolean>;

  constructor(private localStorageService:LocalStorageService,private store:Store<State>){
    // this.currentUser$=this.localStorageService.get('getCurrentUserData');
    this.isUserLoggedIn$=this.store.select(isUserLoggedIn);
  }

  logout():void{
    this.store.dispatch(unSetCurrentUser())
  }

}
