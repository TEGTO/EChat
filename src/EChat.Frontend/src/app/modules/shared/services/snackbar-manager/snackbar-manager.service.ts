import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorAnnotatedComponent } from '../..';

@Injectable({
  providedIn: 'root'
})
export class SnackbarManager {
  errorDurationInSeconds = 5;

  constructor(
    private readonly snackBar: MatSnackBar
  ) { }

  openErrorSnackbar(errors: string[]): void {
    this.snackBar.openFromComponent(ErrorAnnotatedComponent, {
      duration: this.errorDurationInSeconds * 1000,
      data: {
        messages: errors
      }
    });
  }
}
