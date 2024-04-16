import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ILogin,
  ISignUp,
  IverifyOtp,
  IConfirmPass,
} from '../../shared/types/user.Interface';
import { IApiResponse } from '../../../app/shared/types/response.interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private authApi = '/api/auth';
  sendGoogleToken(data: string): Observable<any> {
    return this.http.post<any>(`${this.authApi}/googleauth`, {
      googleToken: data,
    });
  }
  signup(signupData: ISignUp): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${this.authApi}/signup`, signupData);
  }
  login(loginData: ILogin): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(
      `${this.authApi}/user-login`,
      loginData
    );
  }
  forgotPass(email: { email: string }): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(
      `${this.authApi}/forgot-password`,
      email
    );
  }
  verifyOtp(otpData: IverifyOtp): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${this.authApi}/verify-otp`, otpData);
  }
  adminLogin(adminData: ILogin): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(
      `${this.authApi}/admin-login`,
      adminData
    );
  }
  resentOtp(data: { email: string }): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${this.authApi}/resent-otp`, data);
  }
  logout(): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${this.authApi}/user-logout`, {});
  }
  checkTokenValidation(token: string): Observable<any> {
    return this.http.post(`${this.authApi}/reset-password`, { token });
  }
  confirmPassword(data: IConfirmPass): Observable<IApiResponse> {
    return this.http.put<IApiResponse>(
      `${this.authApi}/confirm-password`,
      data
    );
  }
}
