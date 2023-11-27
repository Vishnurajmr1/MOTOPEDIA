import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../../shared/data-access/global/local-storage.service';
import { JwtService } from '../../shared/data-access/global/jwt.service';
import { userAccess } from 'src/const';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const jwtService = inject(JwtService);
  const localStorageService = inject(LocalStorageService);
  // const token = localStorageService.get('access_token');
  const token = localStorage.getItem(userAccess)
  console.log(token);

  if (!token) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  if (jwtService.isUser(token) && !jwtService.isTokenExpired(token)) {
    return true;
  }

  router.navigateByUrl('/auth/login');
  return false;
};
