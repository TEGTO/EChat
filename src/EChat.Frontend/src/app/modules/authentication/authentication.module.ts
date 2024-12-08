import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects, authReducer, AuthViewComponent } from '.';

@NgModule({
  declarations: [
    AuthViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('authentication', authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [AuthViewComponent]
})
export class AuthenticationModule { }
