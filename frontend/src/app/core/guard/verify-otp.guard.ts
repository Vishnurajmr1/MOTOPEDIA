import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../../shared/data-access/global/local-storage.service';

export const verifyOTPGuard: CanActivateFn = () => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);
  const verificationTimeStamp =
    localStorageService.getOtpVerifyTimeLimitToken();
  if (verificationTimeStamp) {
    const currentTime = new Date().getTime();
    const difference = currentTime - parseInt(verificationTimeStamp, 10);

    const accessAllowed = difference <= 5 * 60 * 1000;
    if (accessAllowed) {
      return true;
    }
  }
  router.navigate(['/not-found']);
  return false;
};
