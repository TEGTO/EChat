/* eslint-disable @typescript-eslint/no-explicit-any */
import { chatReducer, ChatState, receiveAllMessagesFailure, receiveAllMessagesSuccess, receiveMessageFailure, receiveMessageSuccess } from "..";

describe('ChatReducer', () => {
    const initialChatState: ChatState = {
        messages: [],
        error: null,
    };

    const mockMessages = [
        { text: 'Hello', userName: 'User1', isSent: true, sentiment: 'Positive' },
        { text: 'Hi there!', userName: 'User2', isSent: false, sentiment: 'Neutral' },
    ];

    const mockMessage = { text: 'New message', userName: 'User3', isSent: true, sentiment: 'Negative' };

    it('should return the initial state', () => {
        const action = { type: 'Unknown' } as any;
        const state = chatReducer(initialChatState, action);

        expect(state).toBe(initialChatState);
    });

    it('should handle receiveAllMessagesSuccess action', () => {
        const action = receiveAllMessagesSuccess({ chatMessages: mockMessages });
        const state = chatReducer(initialChatState, action);

        expect(state).toEqual({
            ...initialChatState,
            messages: mockMessages,
            error: null,
        });
    });

    it('should handle receiveAllMessagesFailure action', () => {
        const error = 'Failed to load messages';
        const action = receiveAllMessagesFailure({ error });
        const state = chatReducer(initialChatState, action);

        expect(state).toEqual({
            ...initialChatState,
            error: error,
        });
    });

    it('should handle receiveMessageSuccess action', () => {
        const action = receiveMessageSuccess({ chatMessage: mockMessage });
        const state = chatReducer(initialChatState, action);

        expect(state).toEqual({
            ...initialChatState,
            messages: [...initialChatState.messages, mockMessage],
            error: null,
        });
    });

    it('should handle receiveMessageFailure action', () => {
        const error = 'Failed to send message';
        const action = receiveMessageFailure({ error });
        const state = chatReducer(initialChatState, action);

        expect(state).toEqual({
            ...initialChatState,
            error: error,
        });
    });
});