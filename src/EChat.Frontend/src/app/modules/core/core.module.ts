import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent, MainViewComponent } from '.';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CustomErrorHandler, ValidationMessage, ValidationMessageService } from '../shared';

const routes: Routes = [
  {
    path: "", component: MainViewComponent,
    children: [
    ],
  },
  { path: '**', redirectTo: '' }
];
@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    AuthenticationModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    { provide: ValidationMessage, useClass: ValidationMessageService },
  ],
  bootstrap: [AppComponent]
})
export class CoreModule { }
