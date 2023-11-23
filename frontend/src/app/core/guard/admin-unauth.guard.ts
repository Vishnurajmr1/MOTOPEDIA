import { inject } from '@angular/core';
import { CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageService } from '../../shared/data-access/global/local-storage.service';
import { JwtService } from '../../shared/data-access/global/jwt.service';

export const adminUnauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtService = inject(JwtService);
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.get('access_token');

  if (!token) {
    router.navigateByUrl('/home');
    return false;
  }
  if (jwtService.isAdmin(token)) {
    router.navigateByUrl('/not-found');
    return false;
  }

  router.navigateByUrl('/admin/dashboard');
  return true;
};
