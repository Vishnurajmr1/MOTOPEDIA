import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone, inject } from '@angular/core';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  private snackbar = inject(SnackbarService);
  private zone = inject(NgZone);

  handleError(error: Error | HttpErrorResponse): void {
    let errorMsg = '';
    if (error instanceof HttpErrorResponse) {
      if (error.status == 500) {
        errorMsg = error.statusText;
      } else {
        console.log('Error from the server', error);
        errorMsg =
          error.error.message || error.error.errorMessage || error.statusText;
      }
    } else {
      console.log('Error from the client', error);
      errorMsg = error.message;
    }
    this.zone.run(() => this.snackbar.showError(errorMsg));
  }
}
