/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable, of } from "rxjs";
import { AuthData, AuthEffects, getAuthData, getAuthDataFailure, getAuthDataSuccess, logOutUser, logOutUserSuccess, signInUser, signInUserFailure, signInUserSuccess } from "..";
import { LocalStorageService } from "../../shared";

describe('AuthEffects', () => {
    let actions$: Observable<any>;
    let effects: AuthEffects;
    let mockLocalStorage: jasmine.SpyObj<LocalStorageService>;

    const mockAuthData: AuthData = { userName: 'testUser', id: '12345' };

    beforeEach(() => {
        mockLocalStorage = jasmine.createSpyObj('LocalStorageService', ['setItem', 'getItem', 'removeItem']);

        TestBed.configureTestingModule({
            providers: [
                AuthEffects,
                provideMockActions(() => actions$),
                { provide: LocalStorageService, useValue: mockLocalStorage },
            ],
        });

        effects = TestBed.inject(AuthEffects);
    });

    describe('signInUser$', () => {
        it('should dispatch signInUserSuccess and store auth data on success', () => {
            const action = signInUser({ name: 'testUser' });
            const outcome = signInUserSuccess({ authData: mockAuthData });

            actions$ = of(action);

            effects.singInUser$.subscribe(result => {
                expect(result.type).toEqual(outcome.type);
                expect(mockLocalStorage.setItem).toHaveBeenCalled();
            });
        });

        it('should dispatch signInUserFailure on error', () => {
            const action = signInUser({ name: 'testUser' });
            const outcome = signInUserFailure();

            actions$ = of(action);

            spyOn(Math, 'random').and.throwError('Random generation failed');

            effects.singInUser$.subscribe(result => {
                expect(result).toEqual(outcome);
            });
        });
    });

    describe('getAuthData$', () => {
        it('should dispatch getAuthDataSuccess if data exists in local storage', () => {
            const action = getAuthData();
            const outcome = getAuthDataSuccess({ authData: mockAuthData });

            mockLocalStorage.getItem.and.returnValue(JSON.stringify(mockAuthData));

            actions$ = of(action);

            effects.getAuthData$.subscribe(result => {
                expect(result).toEqual(outcome);
                expect(mockLocalStorage.getItem).toHaveBeenCalledWith(effects.storageAuthDataKey);
            });
        });

        it('should dispatch getAuthDataFailure if no data exists', () => {
            const action = getAuthData();
            const outcome = getAuthDataFailure();

            mockLocalStorage.getItem.and.returnValue(null);

            actions$ = of(action);

            effects.getAuthData$.subscribe(result => {
                expect(result).toEqual(outcome);
                expect(mockLocalStorage.getItem).toHaveBeenCalledWith(effects.storageAuthDataKey);
            });
        });

        it('should dispatch getAuthDataFailure on error', () => {
            const action = getAuthData();
            const outcome = getAuthDataFailure();

            mockLocalStorage.getItem.and.throwError('Storage error');

            actions$ = of(action);

            effects.getAuthData$.subscribe(result => {
                expect(result).toEqual(outcome);
            });
        });
    });

    describe('logOutUser$', () => {
        it('should dispatch logOutUserSuccess and remove auth data', () => {
            const action = logOutUser();
            const outcome = logOutUserSuccess();

            actions$ = of(action);

            effects.logOutUser$.subscribe(result => {
                expect(result).toEqual(outcome);
                expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(effects.storageAuthDataKey);
            });
        });
    });
});