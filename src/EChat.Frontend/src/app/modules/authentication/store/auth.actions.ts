
import { createAction, props } from "@ngrx/store";
import { AuthData } from "../models/authData";

export const getAuthData = createAction(
    '[Auth] Get Authenticated Data'
);
export const getAuthDataSuccess = createAction(
    '[Auth] Get Authenticated Data Success',
    props<{ authData: AuthData }>()
);
export const getAuthDataFailure = createAction(
    '[Auth] Get Authenticated Data Failure'
);

export const signInUser = createAction(
    '[Auth] Sing In User',
    props<{ name: string }>()
);
export const signInUserSuccess = createAction(
    '[Auth] Sing In By User Data Success',
    props<{ authData: AuthData }>()
);
export const signInUserFailure = createAction(
    '[Auth] Sing In By User Data Failure',
);

export const logOutUser = createAction(
    '[Auth] Log out Authenticated User'
);
export const logOutUserSuccess = createAction(
    '[Auth] Log out Authenticated User Success'
);

