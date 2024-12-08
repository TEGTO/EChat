import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";

@Injectable()
export class ChatEffects {
    constructor(
        private readonly actions$: Actions,
    ) { }

    // sendMessage$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(sendMessage),
    //         debounceTime(environment.botChatDebouncingTimeInMilliseconds),
    //         mergeMap((action) =>
    //             this.apiService.sendQuery(action.req).pipe(
    //                 map(response => sendAdvisorQuerySuccess({ response: response })),
    //                 catchError(error => of(sendAdvisorQueryFailure({ error: error.message })))
    //             )
    //         )
    //     )
    // );

}