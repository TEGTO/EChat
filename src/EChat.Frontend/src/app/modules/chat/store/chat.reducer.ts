/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer, on } from "@ngrx/store";
import { receiveMessageFailure, receiveMessageSuccess } from "..";

export interface ChatMessage {
    text: string;
    userName: string;
    isSent: boolean;
}

export interface ChatState {
    messages: ChatMessage[],
    error: any
}
const initialChatState: ChatState = {
    messages: [],
    error: null
};

export const chatReducer = createReducer(
    initialChatState,

    on(receiveMessageSuccess, (state, { chatMessage }) => ({
        ...state,
        messages: [...state.messages, chatMessage],
        error: null
    })),
    on(receiveMessageFailure, (state, { error }) => ({
        ...state,
        error: error
    })),
);