import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IConfirmPass,
  ILogin,
  ISignUp,
  IverifyOtp,
} from 'src/app/shared/interfaces/Interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  sendGoogleToken(data: string): Observable<any> {
    return this.http.post('/api/auth/googleauth', { googleToken: data });
  }
  signup(signupData: ISignUp): Observable<any> {
    console.log(signupData);
    return this.http.post('/api/auth/signup', signupData);
  }
}
