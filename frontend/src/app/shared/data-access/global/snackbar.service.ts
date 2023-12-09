import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, action: string = ''): void {
    this.snackBar.open(message, '✅', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      
    });
  }
  showError(message: string): void {
    this.snackBar.open(message, '❌', {
      duration: 3000,
      panelClass: ['success-snackbar'],
    });
  }
}
