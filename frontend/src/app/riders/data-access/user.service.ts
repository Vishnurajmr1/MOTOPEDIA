import { HttpClient } from "@angular/common/http";
import {Injectable,inject} from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subject, takeUntil } from "rxjs";
import { State, getCurrentUserData, isUserLoggedIn } from "../../auth/data-access/state";
import { ICurrentUser } from "../../auth/data-access/state/auth.reducer";
@Injectable({
    providedIn:'root'
})
export class UserService{
    private http:HttpClient=inject(HttpClient);
    private userApi='/api/user';
    currentUser$!: Observable<ICurrentUser>;
    userId:string='';
    private ngUnsubscribe$ = new Subject<void>();
  constructor(private store: Store<State>,private router:Router) {
    this.currentUser$ = this.store.select(getCurrentUserData);
    this.currentUser$
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((res) => {
                this.userId = res?.userId || '';
            });
  }

    getUserById():Observable<any>{
        return this.http.get(`${this.userApi}/get-user-details`)
    }
    followUser(authorId:string):Observable<any>{
        return this.http.post(`${this.userApi}/follow/${authorId}`,{})
    }
    getConnection():Observable<any>{
        return this.http.get<{userId:string,followers:[string],following:[string]}>(`${this.userApi}/connection`)
    }


    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
    
}