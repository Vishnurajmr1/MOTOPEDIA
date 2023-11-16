import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../data-access/global/local-storage.service';
import { JwtService } from '../data-access/global/jwt.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const jwtService = inject(JwtService);
  const localStorageService = inject(LocalStorageService);
  const token = localStorageService.get('access_token');

  if (!token) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  if (jwtService.isUser(token) && !jwtService.isTokenExpired(token)) {
    return true;
  }

  router.navigateByUrl('auth/login');
  return false;
};
