import { Tab } from 'src/app/shared/types';
import { createReducer, on } from '@ngrx/store';
import {
  GetLocalStorageData,
  setCurrentUser,
  setUserLoggedInFalse,
  setUserLoggedInTrue,
  toggleCurrentTab,
  unSetCurrentUser,
} from './actions/auth-page.actions';

export interface ICurrentUser {
  firstName: string;
  lastName: string;
  email: string;
  isEmailVerified: boolean;
  phone: string;
}

export interface AuthState {
  currentAuthTab: Tab;
  isUserLoggedIn: boolean;
  currentUser: ICurrentUser;
}
export const initialState: AuthState = {
  currentAuthTab: Tab.Login,
  isUserLoggedIn: false,
  currentUser: {
    firstName: '',
    lastName: '',
    email: '',
    isEmailVerified: false,
    phone: '',
  },
};

export const authReducer = createReducer(
  initialState,
  on(toggleCurrentTab, (state, action): AuthState => {
    return {
      ...state,
      currentAuthTab:action.currentAuthTab,
    };
  }),
  on(setCurrentUser, (state, action): AuthState => {
    return {
      ...state,
      currentUser: action.currentUser,
      isUserLoggedIn: action.currentUser.isEmailVerified,
    };
  }),
  on(unSetCurrentUser, (state, action): AuthState => {
    return {
      ...state,
      currentUser: {
        firstName: '',
        lastName: '',
        email: '',
        isEmailVerified: false,
        phone: '',
      },
      isUserLoggedIn: false,
    };
  }),
  on(setUserLoggedInTrue, (state, action): AuthState => {
    return {
      ...state,
      isUserLoggedIn: true,
    };
  }),
  on(setUserLoggedInFalse, (state, action): AuthState => {
    return {
      ...state,
      isUserLoggedIn: false,
    };
  }),
  on(GetLocalStorageData, (state, action): AuthState => {
    return {
      ...state,
      currentUser: {
        firstName: action.currentUser.firstName,
        lastName: action.currentUser.lastName,
        email: action.currentUser.email,
        isEmailVerified: action.currentUser.isEmailVerified,
        phone: action.currentUser.phone,
      },
    };
  })
);
