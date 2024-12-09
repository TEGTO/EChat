import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ErrorHandler } from '../..';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService {

  protected get httpClient(): HttpClient { return this._httpClient }

  constructor(
    private readonly _httpClient: HttpClient,
    private readonly errorHandler: ErrorHandler,
  ) { }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected handleError(error: any) {
    const message = this.errorHandler.handleApiError(error);
    return throwError(() => new Error(message));
  }
}