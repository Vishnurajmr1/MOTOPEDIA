import { HttpClient } from "@angular/common/http";
import {Injectable,inject} from '@angular/core';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, Subject, takeUntil } from "rxjs";
import { State, getCurrentUserData, isUserLoggedIn } from "../../auth/data-access/state";
import { ICurrentUser } from "../../auth/data-access/state/auth.reducer";
import { IFollowersDetails, IUpdateProfile } from "src/app/shared/types/user.Interface";
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
    getAUser(userId:string):Observable<any>{
        return this.http.get(`${this.userApi}/get-user/${userId}`)
    }
    followUser(authorId:string):Observable<string>{
        return this.http.post<string>(`${this.userApi}/follow/${authorId}`,{})
    }
    getConnection(userId: string | null = null):Observable<IFollowersDetails>{
        return this.http.get<IFollowersDetails>(`${this.userApi}/connection?Id=${userId || ''}`)
    }
    updateProfile(formData:IUpdateProfile):Observable<IUpdateProfile>{
        return this.http.put<IUpdateProfile>(`${this.userApi}/update-profile`,formData)
    }
    searchUserDetails(searchData:string):Observable<any>{
        return this.http.get(`${this.userApi}/search-user?search=${searchData}`);
    }
    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
    
}