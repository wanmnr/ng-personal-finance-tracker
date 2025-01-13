// src/app/core/services/cancel.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CancelService {
  private cancelRequestSource = new Subject<void>();
  cancelRequest$ = this.cancelRequestSource.asObservable();

  constructor() { }

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
