/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage, sendMessage, startMessageReceiving, stopMessageReceiving } from '../..';
import { ChatViewComponent } from './chat-view.component';

describe('ChatViewComponent', () => {
  let component: ChatViewComponent;
  let fixture: ComponentFixture<ChatViewComponent>;
  let storeSpy: jasmine.SpyObj<Store>;
  let messagesSubject: BehaviorSubject<ChatMessage[]>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj<Store>(['dispatch', 'select']);
    messagesSubject = new BehaviorSubject<ChatMessage[]>([
      { text: 'Hello, World!', userName: 'User1', isSent: true, sentiment: 'Positive' },
    ]);
    storeSpy.select.and.returnValue(messagesSubject.asObservable());

    await TestBed.configureTestingModule({
      declarations: [ChatViewComponent],
      imports: [
        MatCardModule,
        FormsModule,
        ScrollingModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: Store, useValue: storeSpy }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch startMessageReceiving on init', () => {
    expect(storeSpy.dispatch).toHaveBeenCalledWith(startMessageReceiving());
  });

  it('should dispatch stopMessageReceiving on destroy', () => {
    component.ngOnDestroy();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(stopMessageReceiving());
  });

  it('should have messages from the store', () => {
    component.messages$.subscribe((messages) => {
      expect(messages.length).toBe(1);
      expect(messages[0].text).toBe('Hello, World!');
    });
  });

  it('should send a message and clear input field', () => {
    component.messageText = 'Test Message';
    component.sendMessage();

    expect(storeSpy.dispatch).toHaveBeenCalledWith(sendMessage({ text: 'Test Message' }));
    expect(component.messageText).toBe('');
  });

  it('should not send an empty message', () => {
    component.messageText = '  ';
    component.sendMessage();

    expect(storeSpy.dispatch).not.toHaveBeenCalledWith(sendMessage({ text: jasmine.anything() as unknown as string }));
  });

  it('should call scrollToBottom when new messages are received', fakeAsync(() => {
    const scrollToBottomSpy = spyOn<any>(component, 'scrollToBottom').and.callThrough();
    messagesSubject.next([
      { text: 'New Message!', userName: 'User2', isSent: false, sentiment: 'Neutral' },
    ]);

    tick(500);
    fixture.detectChanges();

    expect(scrollToBottomSpy).toHaveBeenCalled();
  }));

  it('should track messages by index', () => {
    const index = component.trackByIndex(1);
    expect(index).toBe(1);
  });

  it('should detect when user is near the bottom of the viewport', () => {
    const viewportMock = jasmine.createSpyObj('CdkVirtualScrollViewport', ['measureScrollOffset']);
    component.viewport = viewportMock;
    viewportMock.measureScrollOffset.and.returnValue(50);

    expect(component['isUserNearBottom']()).toBeTrue();
  });

  it('should not scroll if user is not near the bottom', () => {
    const viewportMock = jasmine.createSpyObj('CdkVirtualScrollViewport', ['measureScrollOffset']);
    component.viewport = viewportMock;
    viewportMock.measureScrollOffset.and.returnValue(1000);

    expect(component['isUserNearBottom']()).toBeFalse();
  });
});
