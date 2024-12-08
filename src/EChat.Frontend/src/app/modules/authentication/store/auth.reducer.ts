/* eslint-disable @typescript-eslint/no-unused-vars */

import { createReducer, on } from "@ngrx/store";
import { getAuthDataSuccess, logOutUserSuccess, signInUserFailure, signInUserSuccess } from "..";

export interface AuthState {
    isAuthenticated: boolean,
    userName: string | null,
    id: string | null
}
const initialAuthState: AuthState = {
    isAuthenticated: false,
    userName: null,
    id: null
};

export const authReducer = createReducer(
    initialAuthState,

    on(signInUserSuccess, (state, { authData }) => ({
        ...initialAuthState,
        isAuthenticated: true,
        userName: authData.userName,
        id: authData.id
    })),
    on(signInUserFailure, (state) => ({
        ...state,
    })),

    on(getAuthDataSuccess, (state, { authData }) => ({
        ...initialAuthState,
        isAuthenticated: true,
        userName: authData.userName,
        id: authData.id
    })),
    on(signInUserFailure, (state) => ({
        ...initialAuthState,
    })),

    on(logOutUserSuccess, (state) => ({
        ...initialAuthState,
    })),

);