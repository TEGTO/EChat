import { ChatMessage, receiveAllMessagesFailure, receiveAllMessagesSuccess, receiveMessageFailure, receiveMessageSuccess, sendMessage, startMessageReceiving, stopMessageReceiving } from "..";

describe('Chat Actions', () => {
    const mockMessage: ChatMessage = {
        text: 'Hello World',
        userName: 'testUser',
        isSent: true,
        sentiment: 'Positive',
    };

    const mockMessages: ChatMessage[] = [
        { text: 'Message 1', userName: 'User1', isSent: true, sentiment: 'Neutral' },
        { text: 'Message 2', userName: 'User2', isSent: false, sentiment: 'Negative' },
    ];

    describe('Send Message Actions', () => {
        it('should create sendMessage action', () => {
            const text = 'Test Message';
            const action = sendMessage({ text });

            expect(action.type).toBe('[Chat] Send Message');
            expect(action.text).toBe(text);
        });
    });

    describe('Receive All Messages Actions', () => {
        it('should create receiveAllMessagesSuccess action', () => {
            const action = receiveAllMessagesSuccess({ chatMessages: mockMessages });

            expect(action.type).toBe('[Chat] Receive All Messages Success');
            expect(action.chatMessages).toEqual(mockMessages);
        });

        it('should create receiveAllMessagesFailure action', () => {
            const error = new Error('Failed to load messages');
            const action = receiveAllMessagesFailure({ error });

            expect(action.type).toBe('[Chat] Receive All Messages Failure');
            expect(action.error).toBe(error);
        });
    });

    describe('Receive Message Actions', () => {
        it('should create receiveMessageSuccess action', () => {
            const action = receiveMessageSuccess({ chatMessage: mockMessage });

            expect(action.type).toBe('[Chat] Receive Message Success');
            expect(action.chatMessage).toEqual(mockMessage);
        });

        it('should create receiveMessageFailure action', () => {
            const error = new Error('Failed to receive message');
            const action = receiveMessageFailure({ error });

            expect(action.type).toBe('[Chat] Receive Message Failure');
            expect(action.error).toBe(error);
        });
    });

    describe('Message Receiving State Actions', () => {
        it('should create startMessageReceiving action', () => {
            const action = startMessageReceiving();

            expect(action.type).toBe('[Chat] Start Receive Message');
        });

        it('should create stopMessageReceiving action', () => {
            const action = stopMessageReceiving();

            expect(action.type).toBe('[Chat] Stop Receive Message');
        });
    });
});