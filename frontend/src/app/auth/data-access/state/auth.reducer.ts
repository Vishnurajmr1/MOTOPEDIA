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
  isVerifiedEmail: boolean;
  mobile: string;
  isBlocked: boolean;
  profilePic?:string;
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
    isVerifiedEmail: false,
    isBlocked: false,
    mobile: '',
  },
};

export const authReducer = createReducer(
  initialState,
  on(toggleCurrentTab, (state, action): AuthState => {
    return {
      ...state,
      currentAuthTab: action.currentAuthTab,
    };
  }),
  on(setCurrentUser, (state, action): AuthState => {
    return {
      ...state,
      currentUser: action.currentUser,
      isUserLoggedIn: action.currentUser.isVerifiedEmail,
    };
  }),
  on(unSetCurrentUser, (state, action): AuthState => {
    return {
      ...state,
      currentUser: {
        firstName: '',
        lastName: '',
        email: '',
        isVerifiedEmail: false,
        isBlocked: false,
        mobile: '',
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
        isVerifiedEmail: action.currentUser.isVerifiedEmail,
        mobile: action.currentUser.mobile,
        isBlocked: action.currentUser.isBlocked,
      },
    };
  })
);
