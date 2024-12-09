/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { SnackbarManager } from '../..';
import { ErrorHandler } from './error-handler';

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandler implements ErrorHandler {

  constructor(
    private readonly snackbarManager: SnackbarManager
  ) { }

  handleHubError(error: any): string {
    let errorMessage;
    if (error.message) {
      errorMessage = error.message;
    }
    if (!errorMessage) {
      errorMessage = `An unknown error occurred!`
    }

    console.error(errorMessage);
    this.snackbarManager.openErrorSnackbar([errorMessage]);

    return errorMessage;
  }
}
