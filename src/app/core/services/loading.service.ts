/**
 * @file loading.service.ts
 * @module app/core/services
 * @description Global loading state management service for handling application-wide loading indicators
 *
 * @remarks
 * Provides centralized loading state management through RxJS BehaviorSubject.
 * Key features:
 * - Reactive loading state updates via Observable
 * - Synchronous loading state access
 * - Root-level singleton injection
 *
 * @example
 * Basic usage in components:
 * ```typescript
 * export class MyComponent {
 *   constructor(private loadingService: LoadingService) {
 *     // Subscribe to loading state changes
 *     this.loadingService.isLoading$.subscribe(
 *       isLoading => console.log('Loading state:', isLoading)
 *     );
 *   }
 *
 *   startOperation(): void {
 *     this.loadingService.setLoading(true);
 *     // ... perform operation
 *     this.loadingService.setLoading(false);
 *   }
 * }
 * ```
 *
 * Usage with HTTP interceptor:
 * ```typescript
 * @Injectable()
 * export class LoadingInterceptor implements HttpInterceptor {
 *   constructor(private loadingService: LoadingService) {}
 *
 *   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 *     this.loadingService.setLoading(true);
 *     return next.handle(request).pipe(
 *       finalize(() => this.loadingService.setLoading(false))
 *     );
 *   }
 * }
 * ```
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  /**
   * Updates the application's loading state
   * @param loading The new loading state
   */
  setLoading(loading: boolean): void {
    this.isLoadingSubject.next(loading);
  }

  /**
   * Retrieves the current loading state synchronously
   * @returns The current loading state
   */
  getLoading(): boolean {
    return this.isLoadingSubject.value;
  }
}
