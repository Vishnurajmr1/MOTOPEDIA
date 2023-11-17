import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../data-access/global/local-storage.service';
import { JwtService } from '../data-access/global/jwt.service';

export const adminAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const jwtService = inject(JwtService);
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.get('access_token');

  if (!token) {
    router.navigateByUrl('/auth/admin/login');
    return false;
  }

  if (jwtService.isAdmin(token) && !jwtService.isTokenExpired(token)) {
    return true;
  }
  router.navigateByUrl('auth/admin/login');
  return false;
};
