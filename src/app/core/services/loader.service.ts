/**
 * @file loader.service.ts
 * @module Core/Services/Loader
 * @description Global loading state management service for application-wide loading indicators
 *
 * @remarks
 * Provides centralized loading state management through an observable stream.
 * Commonly used with HTTP interceptors and loading overlay components.
 *
 * @example
 * ```typescript
 * // In a component
 * constructor(private loaderService: LoaderService) {
 *   this.loaderService.isLoading$.subscribe(isLoading => {
 *     // Handle loading state changes
 *   });
 * }
 *
 * // Manually controlling loader
 * this.loaderService.show();
 * // ... async operation
 * this.loaderService.hide();
 * ```
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  /**
   * Internal subject for managing loading state
   * @internal
   */
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  /**
   * Observable stream of the current loading state
   */
  isLoading$ = this.isLoadingSubject.asObservable();

  /**
   * Activates the loading state
   */
  show(): void {
    this.isLoadingSubject.next(true);
  }

  /**
   * Deactivates the loading state
   */
  hide(): void {
    this.isLoadingSubject.next(false);
  }
}
