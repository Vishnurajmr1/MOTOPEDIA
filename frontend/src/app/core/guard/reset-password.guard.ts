import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/data-access/auth.service';

export const resetPasswordGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = route.params['token'];
  const checkTokenValidation = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      authService.checkTokenValidation(token).subscribe({
        next: (res) => {
          resolve(true);
        },
        error: (err) => {
          resolve(false);
        },
      });
    });
  };
  try {
    const isValid = await checkTokenValidation();
    if (isValid) {
      return true;
    } else {
      router.navigateByUrl('/home');
      return false;
    }
  } catch (error) {
    console.error(error);
    return false; // Handle any errors appropriately
  }
};
