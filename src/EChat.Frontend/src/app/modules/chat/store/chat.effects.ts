import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, merge, of, switchMap, withLatestFrom } from "rxjs";
import { createDefaultMessage, mapMessageToChatMessage, Message, receiveAllMessagesFailure, receiveAllMessagesSuccess, receiveMessageFailure, receiveMessageSuccess, sendMessage, SignalChat, startMessageReceiving, stopMessageReceiving } from "..";
import { selectAuthState } from "../../authentication";

@Injectable()
export class ChatEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly chatService: SignalChat,
        private readonly store: Store
    ) { }

    sendMessage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sendMessage),
            withLatestFrom(this.store.select(selectAuthState)),
            switchMap(([action, authState]) => {
                const message: Message = {
                    ...createDefaultMessage(),
                    text: action.text,
                    name: authState.userName ?? "",
                    userId: authState.id ?? "",
                };

                this.chatService.sendMessage(message);
                return of();
            })
        ),
        { dispatch: false }
    );

    startMessageReceiving$ = createEffect(() =>
        this.actions$.pipe(
            ofType(startMessageReceiving),
            withLatestFrom(this.store.select(selectAuthState)),
            switchMap(([, authState]) => {
                this.chatService.startConnection();

                const receiveAllMessages = this.chatService.receiveAllMessages().pipe(
                    map((messages) => {
                        const chatMessages = messages.map(message => mapMessageToChatMessage(message, authState.id ?? ""))
                        return receiveAllMessagesSuccess({ chatMessages });
                    }),
                    catchError((error) =>
                        of(receiveAllMessagesFailure({ error: error.message }))
                    )
                );

                const receiveNewMessage = this.chatService.receiveMessage().pipe(
                    map((message) => {
                        const chatMessage = mapMessageToChatMessage(message, authState.id ?? "");
                        return receiveMessageSuccess({ chatMessage });
                    }),
                    catchError((error) =>
                        of(receiveMessageFailure({ error: error.message }))
                    )
                );

                return merge(receiveAllMessages, receiveNewMessage);
            })
        )
    );

    stopMessageReceiving$ = createEffect(() =>
        this.actions$.pipe(
            ofType(stopMessageReceiving),
            switchMap(() => {
                this.chatService.stopConnection();
                return of();
            })
        ),
        { dispatch: false }
    );
}