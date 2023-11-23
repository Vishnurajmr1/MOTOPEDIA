import {inject} from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
} from '@angular/router';
import { AuthService } from 'src/app/auth/data-access/auth.service';

export const resetPasswordGuard: CanActivateFn = async (route,state) => {
    const authService=inject(AuthService);
    const router=inject(Router);
    const token=route.params['token'];
  return true;
  const checkTokenValidation=():Promise<boolean>=>{
    return new Promise((resolve,reject)=>{
        // authService.check
    })
  }
};
