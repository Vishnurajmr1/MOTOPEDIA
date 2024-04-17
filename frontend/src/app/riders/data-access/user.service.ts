import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  State,
  getCurrentUserData,
  isUserLoggedIn,
} from '../../auth/data-access/state';
import { ICurrentUser } from '../../auth/data-access/state/auth.reducer';
import {
  IFollowersDetails,
  IUpdateProfile,
} from '../../../app/shared/types/user.Interface';
import { IApiResponse } from '../../../app/shared/types/response.interface';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  // private userApi = '/api/user';
  private userApi = `${environment.apiUrl}/user`;
  currentUser$!: Observable<ICurrentUser>;
  userId: string = '';
  private ngUnsubscribe$ = new Subject<void>();
  constructor(private store: Store<State>, private router: Router) {
    this.currentUser$ = this.store.select(getCurrentUserData);
    this.currentUser$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((res) => {
      this.userId = res?.userId || '';
    });
  }

  getUserById(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.userApi}/get-user-details`);
  }
  getAUser(userId: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.userApi}/get-user/${userId}`);
  }
  followUser(authorId: string): Observable<string> {
    return this.http.post<string>(`${this.userApi}/follow/${authorId}`, {});
  }
  getConnection(userId: string | null = null): Observable<IFollowersDetails> {
    return this.http.get<IFollowersDetails>(
      `${this.userApi}/connection?Id=${userId || ''}`
    );
  }
  updateProfile(formData: IUpdateProfile): Observable<IUpdateProfile> {
    return this.http.put<IUpdateProfile>(
      `${this.userApi}/update-profile`,
      formData
    );
  }
  searchUserDetails(searchData: string): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.userApi}/search-user?search=${searchData}`);
  }
  getAvailableSearchUserDetails(): Observable<any> {
    return this.http.get(`${this.userApi}/users`);
  }
  getAllSubscriptions() {
    return this.http.get(`${this.userApi}/all-subscriptions`);
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
