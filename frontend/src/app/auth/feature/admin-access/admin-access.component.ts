import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/shared/interfaces/Interface';
import { AuthService } from '../../data-access/auth.service';
import { SnackbarService } from 'src/app/shared/data-access/global/snackbar.service';
import { LocalStorageService } from 'src/app/shared/data-access/global/local-storage.service';

@Component({
  selector: 'app-admin-access',
  templateUrl: './admin-access.component.html',
  styleUrls: ['./admin-access.component.css'],
})
export class AdminAccessComponent {
  private authService = inject(AuthService);
  private snackBar = inject(SnackbarService);
  private localStorage = inject(LocalStorageService);
  private router = inject(Router);
  loginFormSubmit(data: ILogin) {
    this.authService.adminLogin(data).subscribe({
      next: (res) => {
        console.log(res);
        this.localStorage.save('access_token', res.accessToken);
        this.localStorage.save('refresh_token', res.refreshToken);
        this.snackBar.showSuccess('MOTOPEDIA ADMIN LOGIN SUCCESSFULL');
        this.router.navigateByUrl('/admin/dashboard');
      },
    });
  }
}
