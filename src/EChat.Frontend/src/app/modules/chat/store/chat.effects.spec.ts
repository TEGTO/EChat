/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Observable, of, throwError } from "rxjs";
import { ChatEffects, Message, receiveAllMessagesFailure, receiveAllMessagesSuccess, receiveMessageFailure, receiveMessageSuccess, sendMessage, SignalChat, startMessageReceiving, stopMessageReceiving } from "..";
import { selectAuthState } from "../../authentication";

describe('ChatEffects', () => {
    let actions$: Observable<any>;
    let effects: ChatEffects;
    let chatServiceSpy: jasmine.SpyObj<SignalChat>;
    let store: MockStore;

    const mockAuthState = {
        id: '12345',
        userName: 'TestUser',
        isAuthenticated: true,
    };
    const mockMessage: Message = {
        text: 'Hello World',
        name: 'TestUser',
        userId: '12345',
        sentiment: 'Positive',
    };

    beforeEach(() => {
        chatServiceSpy = jasmine.createSpyObj('SignalChat', [
            'sendMessage',
            'startConnection',
            'stopConnection',
            'receiveAllMessages',
            'receiveMessage',
        ]);
        TestBed.configureTestingModule({
            providers: [
                ChatEffects,
                provideMockActions(() => actions$),
                provideMockStore({ initialState: mockAuthState }),
                { provide: SignalChat, useValue: chatServiceSpy },
            ],
        });

        store = TestBed.inject(MockStore);
        store.overrideSelector(selectAuthState, mockAuthState);

        effects = TestBed.inject(ChatEffects);
    });

    describe('sendMessage$', () => {
        it('should call chatService.sendMessage with the correct message', () => {
            const action = sendMessage({ text: 'Hello World' });
            actions$ = of(action);

            effects.sendMessage$.subscribe(() => {
                expect(chatServiceSpy.sendMessage).toHaveBeenCalledWith({
                    text: 'Hello World',
                    name: 'TestUser',
                    userId: '12345',
                    sentiment: '',
                });
            });
        });
    });

    describe('startMessageReceiving$', () => {
        it('should start connection and handle incoming messages', () => {
            const action = startMessageReceiving();
            actions$ = of(action);

            chatServiceSpy.receiveAllMessages.and.returnValue(of([mockMessage]));
            chatServiceSpy.receiveMessage.and.returnValue(of(mockMessage));

            effects.startMessageReceiving$.subscribe((result) => {
                if (result.type === receiveAllMessagesSuccess.type) {
                    expect(result.chatMessages.length).toBe(1);
                    expect(result.chatMessages[0].text).toBe('Hello World');
                }

                if (result.type === receiveMessageSuccess.type) {
                    expect(result.chatMessage.text).toBe('Hello World');
                }
            });

            expect(chatServiceSpy.startConnection).toHaveBeenCalled();
        });

        it('should handle errors in receiving all messages', () => {
            const action = startMessageReceiving();
            actions$ = of(action);

            chatServiceSpy.receiveAllMessages.and.returnValue(throwError(() => new Error('Error receiving all messages')));
            chatServiceSpy.receiveMessage.and.returnValue(of(mockMessage));

            effects.startMessageReceiving$.subscribe((result) => {
                if (result.type === receiveAllMessagesFailure.type) {
                    expect(result.error).toBe('Error receiving all messages');
                }
            });
        });

        it('should handle errors in receiving new messages', () => {
            const action = startMessageReceiving();
            actions$ = of(action);

            chatServiceSpy.receiveMessage.and.returnValue(throwError(() => new Error('Error receiving new messages')));
            chatServiceSpy.receiveAllMessages.and.returnValue(of([mockMessage]));

            effects.startMessageReceiving$.subscribe((result) => {
                if (result.type === receiveMessageFailure.type) {
                    expect(result.error).toBe('Error receiving new messages');
                }
            });
        });
    });

    describe('stopMessageReceiving$', () => {
        it('should call chatService.stopConnection', () => {
            const action = stopMessageReceiving();
            actions$ = of(action);

            effects.stopMessageReceiving$.subscribe(() => {
                expect(chatServiceSpy.stopConnection).toHaveBeenCalled();
            });
        });
    });
});
