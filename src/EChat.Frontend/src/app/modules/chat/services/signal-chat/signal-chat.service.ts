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

    this.hubConnection.start().catch((error: any) => {
      this.errorHandler.handleHubError(error);
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
