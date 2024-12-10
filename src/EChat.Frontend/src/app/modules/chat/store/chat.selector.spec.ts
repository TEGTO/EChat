import { ChatState, selectChatMessages, selectChatState } from "..";

describe('Chat Selectors', () => {
    const initialState: ChatState = {
        messages: [
            { text: 'Hello', userName: 'User1', isSent: true, sentiment: 'Positive' },
            { text: 'Hi', userName: 'User2', isSent: false, sentiment: 'Neutral' },
        ],
        error: null,
    };

    it('should select the chat state', () => {
        const result = selectChatState.projector(initialState);
        expect(result).toEqual(initialState);
    });

    it('should select chat messages', () => {
        const result = selectChatMessages.projector(initialState);
        expect(result).toEqual(initialState.messages);
    });
});