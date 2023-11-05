import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';


Injectable({
  providedIn:'root'
})
export const shouldShowFooterGuard: CanActivateFn = (route, state) => {
  const isNotRestrictedRoute=!state.url.includes('auth');
  return isNotRestrictedRoute;
};
