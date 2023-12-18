import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthPageActions from './actions/auth-page.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/data-access/global/local-storage.service';
import { AuthService } from '../auth.service';
import { catchError, map, switchMap, tap } from 'rxjs';
import { ICurrentUser } from './auth.reducer';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private store: Store,
    private authService: AuthService,
    private router: Router
  ) {}
  storeCurrentUser$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthPageActions.setCurrentUser),
        tap((action) => {
          this.localStorageService.saveKeys(action.currentUser);
          this.router.navigate(['/home']);
        })
      );
    },
    { dispatch: false }
  );

  storeToken$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthPageActions.setAccessToken),
        tap((action) => {
          this.localStorageService.save(action.tokenType, action.accessToken);
        })
      );
    },
    { dispatch: false }
  );
  clearLocalStorageOnLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthPageActions.unSetCurrentUser),
      switchMap(() =>
        this.authService.logout().pipe(
          switchMap((r) => {
            return [
              AuthPageActions.ClearLocalStorageAction(),
              AuthPageActions.logoutSuccess(),
            ];
          }),
          catchError((error) => {
            console.error('Logout Api Error:', error);
            return [
              AuthPageActions.ClearLocalStorageAction(),
              AuthPageActions.logoutFailer(),
            ];
          })
        )
      )
    );
  });

  clearLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthPageActions.ClearLocalStorageAction),
        tap((r) => {
          this.localStorageService.clear();
        })
      ),
    { dispatch: false }
  );

  getLocalStorageData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthPageActions.checkLocalStorageAction),
      map(() => {
        const keys = [
          'userId',
          'firstName',
          'lastName',
          'email',
          'isVerifiedEmail',
          'mobile',
        ];
        const currentUserData: any = {};
        for (const key of keys) {
          const value = this.localStorageService.get(key);
          if (value !== null) {
            currentUserData[key] =
              key === 'isVerifiedEmail'
                ? isJSONString(value)
                  ? JSON.parse(value)
                  : false
                : value;
            function isJSONString(str: string) {
              try {
                JSON.parse(str);
                return true;
              } catch (e) {
                return false;
              }
            }
          }
        }
        console.log(currentUserData);
        const isUserPresent =
          Object.keys(currentUserData).length > 0 &&
          currentUserData.isVerifiedEmail;

        if (isUserPresent) {
          this.store.dispatch(AuthPageActions.setUserLoggedInTrue());
        }

        return AuthPageActions.GetLocalStorageData({
          currentUser: currentUserData,
        });
      })
    )
  );
}
