import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LocalStorageService } from '../../shared/data-access/global/local-storage.service';
import { Router } from '@angular/router';
import { GlobalErrorHandler } from '../../shared/data-access/global/global-error-handler.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);
  private errorHandler = inject(GlobalErrorHandler);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.localStorageService.get('access_token');
    console.log('token localstore ==>', token);

    if (request.url.includes('https://api.cloudinary.com/v1_1')) {
      return next.handle(request);
    }

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('unauth-response catcher works well', error.message);
        if (error.status === 401) {
          this.router.navigate(['/auth/login']);
        }
        // if (error.status === 403) {
        //   this.router.navigate(['/home']);
        // }
        return throwError(() => error);
      })
    );
  }
}
