/**
 * @file cancel.service.ts
 * @description HTTP request cancellation management service
 * @module Service
 *
 * @remarks
 * Manages cancellation tokens for in-flight HTTP requests.
 * Uses RxJS Subject to broadcast cancellation signals.
 *
 * @usageNotes
 * Use with HTTP interceptors to implement request cancellation patterns
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CancelService {
  private cancelRequestSource = new Subject<void>();
  cancelRequest$ = this.cancelRequestSource.asObservable();

  constructor() {}

  /**
   * Cancels all pending HTTP requests
   */
  cancelPendingRequests(): void {
    this.cancelRequestSource.next();
  }

  /**
   * Resets the cancel subject
   */
  resetCancelToken(): void {
    this.cancelRequestSource = new Subject<void>();
    this.cancelRequest$ = this.cancelRequestSource.asObservable();
  }
}
