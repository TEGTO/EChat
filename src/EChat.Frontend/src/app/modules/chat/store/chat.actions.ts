/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, props } from "@ngrx/store";
import { ChatMessage } from "..";
import { Message } from "../dtos/message";

export const sendMessage = createAction(
    '[Chat] Send Message',
    props<{ text: string }>()
);

export const receiveMessage = createAction(
    '[Chat] Receive Message',
    props<{ message: Message }>()
);
export const receiveMessageSuccess = createAction(
    '[Chat] Receive Message Success',
    props<{ chatMessage: ChatMessage }>()
);
export const receiveMessageFailure = createAction(
    '[Chat] Receive Message Failure',
    props<{ error: any }>()
);


