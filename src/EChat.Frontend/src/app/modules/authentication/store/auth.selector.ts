import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "..";

export const selectAuthState = createFeatureSelector<AuthState>('authentication');

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.isAuthenticated
);