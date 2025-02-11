/**
 * @file theme.service.ts
 * @module Core/Services/Theme
 * @description Manages application-wide theme state with dark mode toggle functionality
 *
 * @remarks
 * This service provides:
 * - Observable theme state management
 * - Dark mode toggle capability
 * - Root-level singleton instance
 * - Reactive theme updates across components
 *
 * @example
 * Subscribe to theme changes:
 * ```typescript
 * constructor(private themeService: ThemeService) {
 *   themeService.isDarkMode$.subscribe(isDark => {
 *     // Update component theme
 *     this.theme = isDark ? 'dark' : 'light';
 *   });
 * }
 *
 * Toggle theme:
 * ```typescript
 * toggleTheme() {
 *   this.themeService.toggleTheme();
 * }
 * ```
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  /**
   * BehaviorSubject maintaining the current dark mode state
   * @private
   */
  private darkMode = new BehaviorSubject<boolean>(false);

  /**
   * Observable stream of the dark mode state
   * Initial value is false (light mode)
   */
  isDarkMode$ = this.darkMode.asObservable();

  /**
   * Toggles between light and dark theme modes
   * Emits the new theme state to all subscribers
   */
  toggleTheme(): void {
    this.darkMode.next(!this.darkMode.value);
  }
}
