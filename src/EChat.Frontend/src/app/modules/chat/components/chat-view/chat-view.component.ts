import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { ChatMessage, selectChatMessages, sendMessage, startMessageReceiving } from '../..';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrl: './chat-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatViewComponent implements OnInit {
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
      tap(() => {
        this.scrollToBottom();
      })
    );
  }

  private scrollToBottom() {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        if (this.viewport) {
          const lastIndex = this.viewport.getDataLength();
          this.viewport.scrollToIndex(lastIndex, 'smooth');
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
