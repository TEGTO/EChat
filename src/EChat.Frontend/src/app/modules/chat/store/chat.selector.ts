import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ChatState } from "..";

export const selectChatState = createFeatureSelector<ChatState>('chat');

export const selectChatMessages = createSelector(
    selectChatState,
    (state: ChatState) => state.messages
);