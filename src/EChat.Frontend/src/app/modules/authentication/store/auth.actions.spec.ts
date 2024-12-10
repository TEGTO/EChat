import { getAuthData, getAuthDataFailure, getAuthDataSuccess, logOutUser, logOutUserSuccess, signInUser, signInUserFailure, signInUserSuccess } from "..";

describe('Auth Actions', () => {
    const mockAuthData = { userName: 'testUser', id: '12345' };

    describe('Get Authentication Data Actions', () => {
        it('should create getAuthData action', () => {
            const action = getAuthData();
            expect(action.type).toBe('[Auth] Get Authenticated Data');
        });

        it('should create getAuthDataSuccess action', () => {
            const action = getAuthDataSuccess({ authData: mockAuthData });
            expect(action.type).toBe('[Auth] Get Authenticated Data Success');
            expect(action.authData).toEqual(mockAuthData);
        });

        it('should create getAuthDataFailure action', () => {
            const action = getAuthDataFailure();
            expect(action.type).toBe('[Auth] Get Authenticated Data Failure');
        });
    });

    describe('Sign In User Actions', () => {
        it('should create signInUser action', () => {
            const name = 'testUser';
            const action = signInUser({ name });
            expect(action.type).toBe('[Auth] Sing In User');
            expect(action.name).toBe(name);
        });

        it('should create signInUserSuccess action', () => {
            const action = signInUserSuccess({ authData: mockAuthData });
            expect(action.type).toBe('[Auth] Sing In By User Data Success');
            expect(action.authData).toEqual(mockAuthData);
        });

        it('should create signInUserFailure action', () => {
            const action = signInUserFailure();
            expect(action.type).toBe('[Auth] Sing In By User Data Failure');
        });
    });

    describe('Log Out User Actions', () => {
        it('should create logOutUser action', () => {
            const action = logOutUser();
            expect(action.type).toBe('[Auth] Log out Authenticated User');
        });

        it('should create logOutUserSuccess action', () => {
            const action = logOutUserSuccess();
            expect(action.type).toBe('[Auth] Log out Authenticated User Success');
        });
    });
});