import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { ChatMessage, selectChatMessages, sendMessage, startMessageReceiving, stopMessageReceiving } from '../..';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrl: './chat-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatViewComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  readonly itemHeight = 50;
  messageText = '';

  messages$ !: Observable<ChatMessage[]>;

  constructor(
    private readonly ngZone: NgZone,
    private readonly store: Store,
  ) { }


  ngOnInit() {
    this.store.dispatch(startMessageReceiving());

    this.messages$ = this.store.select(selectChatMessages).pipe(
      tap((messages) => {
        if (this.isUserNearBottom()) {
          this.scrollToBottom(messages.length);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.store.dispatch(stopMessageReceiving());
  }

  private isUserNearBottom(): boolean {
    if (!this.viewport) return false;

    const scrollOffset = this.viewport.measureScrollOffset('bottom');
    const threshold = 5 * this.itemHeight;
    return scrollOffset <= threshold;
  }

  private scrollToBottom(messageAmount: number) {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        if (this.viewport) {
          this.viewport.scrollToIndex(messageAmount - 1, 'smooth');
        }
      }, 0);
    });
  }

  sendMessage() {
    if (this.messageText.trim()) {
      this.store.dispatch(sendMessage({ text: this.messageText }));
      this.messageText = '';
    }
  }
  trackByIndex(index: number): number {
    return index;
  }
}
