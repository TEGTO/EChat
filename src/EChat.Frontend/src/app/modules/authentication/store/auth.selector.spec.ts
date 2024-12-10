import { AuthState, selectAuthState, selectIsAuthenticated } from "..";

describe('Authentication Selectors', () => {
    const initialState: AuthState = {
        isAuthenticated: false,
        userName: null,
        id: null,
    };

    it('should select the authentication state', () => {
        const result = selectAuthState.projector(initialState);
        expect(result).toEqual(initialState);
    });

    it('should select IsAuthenticated', () => {
        const result = selectIsAuthenticated.projector(initialState);
        expect(result).toEqual(initialState.isAuthenticated);
    });
});