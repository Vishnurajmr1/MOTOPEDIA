import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State, isUserLoggedIn } from 'src/app/auth/data-access/state';
import { map, take } from 'rxjs';
export const unauthenticatedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store<State>);
  return store.select(isUserLoggedIn).pipe(
    take(1),
    map((isUserLoggedIn) => {
      if (isUserLoggedIn) {
        router.navigateByUrl('/');
        return false;
      } else {
        return true;
      }
    })
  );
};
