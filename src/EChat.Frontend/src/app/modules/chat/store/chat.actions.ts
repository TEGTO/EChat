/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from "@ngrx/store";
import { ChatMessage } from "..";

export const sendMessage = createAction(
    '[Chat] Send Message',
    props<{ text: string }>()
);

export const receiveAllMessages = createAction(
    '[Chat] Receive All Messages'
);
export const receiveAllMessagesSuccess = createAction(
    '[Chat] Receive All Messages Success',
    props<{ chatMessages: ChatMessage[] }>()
);
export const receiveAllMessagesFailure = createAction(
    '[Chat] Receive All Messages Failure',
    props<{ error: any }>()
);

export const startMessageReceiving = createAction(
    '[Chat] Receive Message'
);
export const receiveMessageSuccess = createAction(
    '[Chat] Receive Message Success',
    props<{ chatMessage: ChatMessage }>()
);
export const receiveMessageFailure = createAction(
    '[Chat] Receive Message Failure',
    props<{ error: any }>()
);


