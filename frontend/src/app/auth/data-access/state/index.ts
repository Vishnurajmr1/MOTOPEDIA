import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AuthState } from './auth.reducer';

export interface State {
  auth: AuthState;
}

const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const toogleAuthPage = createSelector(
  getAuthFeatureState,
  (state) => state.currentAuthTab
);

export const getCurrentUserData = createSelector(
  getAuthFeatureState,
  (state) => state?.currentUser
);

export const isUserLoggedIn = createSelector(
  getAuthFeatureState,
  (state) => state?.isUserLoggedIn
);

export const getUserEmail = createSelector(
  getAuthFeatureState,
  (state) => state.currentUser.email
);
