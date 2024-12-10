/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { Message } from '../..';
import { environment } from '../../../../../environments/environment';
import { ErrorHandler } from '../../../shared';
import { SignalChat } from './signal-chat';

@Injectable({
  providedIn: 'root'
})
export class SignalChatService implements SignalChat {
  private readonly hubConnection: signalR.HubConnection;

  constructor(private readonly errorHandler: ErrorHandler) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.chatHub)
      .build();
  }

  startConnection() {
    if (this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
      this.hubConnection.start().catch((error: any) => {
        this.errorHandler.handleHubError(error);
      });
    }
  }
  stopConnection() {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.stop().catch((error: any) => {
        this.errorHandler.handleHubError(error);
      });
    }
  }

  receiveAllMessages(): Observable<Message[]> {
    return new Observable<Message[]>((observer) => {
      this.hubConnection.on('LoadMessages', (messages: Message[]) => {
        observer.next(messages);
      });
    });
  }

  receiveMessage(): Observable<Message> {
    return new Observable<Message>((observer) => {
      this.hubConnection.on('ReceiveMessage', (message: Message) => {
        observer.next(message);
      });
    });
  }

  sendMessage(message: Message): void {
    this.hubConnection.invoke('SendMessage', message).catch((error: any) => {
      this.errorHandler.handleHubError(error);
    });
  }
}
