/* eslint-disable @typescript-eslint/no-explicit-any */
import { authReducer, AuthState, getAuthDataFailure, getAuthDataSuccess, logOutUserSuccess, signInUserFailure, signInUserSuccess } from "..";

describe('AuthReducer', () => {
    const initialAuthState: AuthState = {
        isAuthenticated: false,
        userName: null,
        id: null,
    };

    const mockAuthData = {
        userName: 'testUser',
        id: '12345',
    };

    it('should return the initial state', () => {
        const action = { type: 'Unknown' } as any;
        const state = authReducer(initialAuthState, action);
        expect(state).toBe(initialAuthState);
    });

    it('should handle signInUserSuccess action', () => {
        const action = signInUserSuccess({ authData: mockAuthData });
        const state = authReducer(initialAuthState, action);

        expect(state).toEqual({
            ...initialAuthState,
            isAuthenticated: true,
            userName: mockAuthData.userName,
            id: mockAuthData.id,
        });
    });

    it('should handle signInUserFailure action', () => {
        const action = signInUserFailure();
        const state = authReducer(initialAuthState, action);

        expect(state).toEqual({
            ...initialAuthState,
        });
    });

    it('should handle getAuthDataSuccess action', () => {
        const action = getAuthDataSuccess({ authData: mockAuthData });
        const state = authReducer(initialAuthState, action);

        expect(state).toEqual({
            ...initialAuthState,
            isAuthenticated: true,
            userName: mockAuthData.userName,
            id: mockAuthData.id,
        });
    });

    it('should handle getAuthDataFailure action', () => {
        const action = getAuthDataFailure();
        const state = authReducer(initialAuthState, action);

        expect(state).toEqual({
            ...initialAuthState,
        });
    });

    it('should handle logOutUserSuccess action', () => {
        const action = logOutUserSuccess();
        const state = authReducer(initialAuthState, action);

        expect(state).toEqual({
            ...initialAuthState,
        });
    });
});