import { TestBed } from '@angular/core/testing';

import { SignalChatService } from './signal-chat.service';

describe('SignalChatServiceService', () => {
  let service: SignalChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
