import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ILogin,
  ISignUp,
  IverifyOtp,
  IConfirmPass,
} from 'src/app/shared/types/user.Interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private authApi = '/api/auth';
  sendGoogleToken(data: string): Observable<any> {
    return this.http.post(`${this.authApi}/googleauth`, { googleToken: data });
  }
  signup(signupData: ISignUp): Observable<any> {
    return this.http.post(`${this.authApi}/signup`, signupData);
  }
  login(loginData: ILogin): Observable<any> {
    return this.http.post(`${this.authApi}/user-login`, loginData);
  }
  forgotPass(email: { email: string }): Observable<any> {
    return this.http.post(`${this.authApi}/forgot-password`, email);
  }
  verifyOtp(otpData: IverifyOtp): Observable<any> {
    return this.http.post(`${this.authApi}/verify-otp`, otpData);
  }
  adminLogin(adminData: ILogin): Observable<any> {
    return this.http.post(`${this.authApi}/admin-login`, adminData);
  }
  resentOtp(data: { email: string }): Observable<any> {
    return this.http.post(`${this.authApi}/resent-otp`, data);
  }
  logout(): Observable<any> {
    return this.http.post(`${this.authApi}/user-logout`, {});
  }
  checkTokenValidation(token: string): Observable<any> {
    return this.http.post(`${this.authApi}/reset-password`, { token });
  }
  confirmPassword(data:IConfirmPass):Observable<any>{
    return this.http.post(`${this.authApi}/confirm-password`,data);
  }
}
