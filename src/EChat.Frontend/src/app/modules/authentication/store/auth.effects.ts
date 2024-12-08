import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, mergeMap, of } from "rxjs";
import { AuthData, getAuthData, getAuthDataFailure, getAuthDataSuccess, logOutUser, logOutUserSuccess, signInUser, signInUserFailure, signInUserSuccess } from "..";
import { LocalStorageService } from "../../shared";

@Injectable()
export class AuthEffects {
    readonly storageAuthDataKey: string = "authData";

    constructor(
        private readonly actions$: Actions,
        private readonly localStorage: LocalStorageService
    ) { }

    singInUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(signInUser),
            mergeMap((action) => {

                const primitiveId = (Math.random() + 1).toString(36).substring(2);

                const authData: AuthData = {
                    userName: action.name,
                    id: primitiveId
                };

                this.localStorage.setItem(this.storageAuthDataKey, JSON.stringify(authData));

                return of(signInUserSuccess({ authData: authData }));
            }),
            catchError(() => of(signInUserFailure()))
        )
    );

    getAuthData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAuthData),
            mergeMap(() => {
                const json = this.localStorage.getItem(this.storageAuthDataKey);
                if (json !== null) {
                    const authData: AuthData = JSON.parse(json);
                    return of(getAuthDataSuccess({ authData: authData }));
                }
                else {
                    return of(getAuthDataFailure());
                }
            }),
            catchError(() => of(getAuthDataFailure()))
        )
    );

    logOutUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(logOutUser),
            mergeMap(() => {
                this.localStorage.removeItem(this.storageAuthDataKey);
                return of(logOutUserSuccess());
            })
        )
    );
}