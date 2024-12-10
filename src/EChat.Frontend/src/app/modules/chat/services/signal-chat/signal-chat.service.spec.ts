

import { TestBed } from '@angular/core/testing';
import * as signalR from '@microsoft/signalr';
import { ErrorHandler } from '../../../shared';
import { SignalChatService } from './signal-chat.service';

describe('SignalChatService', () => {
  let service: SignalChatService;
  let mockErrorHandler: jasmine.SpyObj<ErrorHandler>;
  let mockHubConnection: jasmine.SpyObj<signalR.HubConnection>;

  beforeEach(() => {
    mockErrorHandler = jasmine.createSpyObj('ErrorHandler', ['handleHubError']);
    mockHubConnection = jasmine.createSpyObj('HubConnection', [
      'start',
      'stop',
      'on',
      'invoke',
      'state',
    ]);

    TestBed.configureTestingModule({
      providers: [
        SignalChatService,
        { provide: ErrorHandler, useValue: mockErrorHandler },
      ],
    });

    service = TestBed.inject(SignalChatService);
  });

  it('should not start connection if already connected', () => {
    Object.defineProperty(mockHubConnection, 'state', {
      get: () => signalR.HubConnectionState.Connected,
      configurable: true,
    });

    service.startConnection();

    expect(mockHubConnection.start).not.toHaveBeenCalled();
  });

  it('should not stop connection if already disconnected', () => {
    Object.defineProperty(mockHubConnection, 'state', {
      get: () => signalR.HubConnectionState.Disconnected,
      configurable: true,
    });

    service.stopConnection();

    expect(mockHubConnection.stop).not.toHaveBeenCalled();
  });
});
