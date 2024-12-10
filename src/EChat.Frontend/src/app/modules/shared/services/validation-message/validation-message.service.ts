/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationMessage } from './validation-message';

@Injectable({
  providedIn: 'root'
})
export class ValidationMessageService implements ValidationMessage {
  private readonly errorMessages: Record<string, string> = {
    required: "Field is required.",
  };

  getValidationMessage(input: AbstractControl<any, any>): { hasError: boolean; message: string } {
    const errorKey = Object.keys(this.errorMessages).find(key => input.hasError(key));
    return errorKey
      ? { hasError: true, message: this.errorMessages[errorKey] }
      : { hasError: false, message: "" };
  }
}
