import { createAction,props } from "@ngrx/store";
import { Tab } from "src/app/shared/types";
import { ICurrentUser } from "../auth.reducer";

export const toggleCurrentTab=createAction(
    '[Auth] Toggle Current Tab',
    props<{currentAuthTab:Tab}>()
)

export const setCurrentUser=createAction(
    '[Auth] Set Current User',
    props<{currentUser:ICurrentUser}>()
)


export const setAccessToken=createAction(
    '[Auth] Save Token In Local Store',
    props<{accessToken:string,tokenType:'access_token'}>()
)

export const unSetCurrentUser=createAction(
    '[Auth] Unset Current User',
)

export const setUserLoggedInTrue=createAction(
    '[Auth] set User Logged In'
)
export const setUserLoggedInFalse=createAction(
    '[Auth] set User Logged In False'
)
export const checkLocalStorageAction=createAction(
    '[Auth] Check User localSession'
)

export const ClearLocalStorageAction=createAction(
    '[Auth] Clear User Local Session'
)

export const logoutSuccess=createAction(
    '[Auth] Logout Success'
)
export const logoutFailer=createAction(
    '[Auth] Logout Failer'
)

export const GetLocalStorageData=createAction(
    '[Auth] Get Local Session',
    props<{currentUser:ICurrentUser}>()
)