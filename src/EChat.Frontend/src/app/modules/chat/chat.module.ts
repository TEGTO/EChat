import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ChatEffects, chatReducer, ChatViewComponent, SignalChat, SignalChatService } from '.';

const routes: Routes = [
  {
    path: "", component: ChatViewComponent,
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    ChatViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule,
    MatButtonModule,
    MatCardModule,
    ScrollingModule,
    FormsModule,
    StoreModule.forFeature('chat', chatReducer),
    EffectsModule.forFeature([ChatEffects]),
  ],
  providers:
    [
      { provide: SignalChat, useClass: SignalChatService },
    ]
})
export class ChatModule { }
