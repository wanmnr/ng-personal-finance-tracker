/**
 * @file preferences.service.ts
 * @module app/core/services
 * @description User preferences management service for storing and retrieving application settings
 *
 * @remarks
 * Manages persistent user preferences through StorageService integration.
 * Key features:
 * - Type-safe preference storage and retrieval
 * - Centralized preference management
 * - Persistent storage across sessions
 *
 * Dependencies:
 * - Requires StorageService for persistence operations
 *
 * @example
 * Basic usage:
 * ```typescript
 * export class SettingsComponent {
 *   constructor(private preferencesService: PreferencesService) {
 *     // Save user preferences
 *     this.preferencesService.savePreferences({
 *       theme: 'dark',
 *       language: 'en',
 *       notifications: true
 *     });
 *
 *     // Retrieve user preferences
 *     const preferences = this.preferencesService.getPreferences();
 *     if (preferences) {
 *       this.applyTheme(preferences.theme);
 *     }
 *   }
 * }
 * ```
 *
 * Integration with theme service:
 * ```typescript
 * export class ThemeService {
 *   constructor(private preferencesService: PreferencesService) {
 *     const preferences = this.preferencesService.getPreferences();
 *     if (preferences?.theme) {
 *       this.setTheme(preferences.theme);
 *     }
 *   }
 *
 *   updateTheme(newTheme: string): void {
 *     const currentPreferences = this.preferencesService.getPreferences() || {
 *       theme: 'light',
 *       language: 'en',
 *       notifications: true
 *     };
 *
 *     this.preferencesService.savePreferences({
 *       ...currentPreferences,
 *       theme: newTheme
 *     });
 *   }
 * }
 * ```
 */

import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

/**
 * Interface defining the structure of user preferences
 */
interface UserPreferences {
  /** User's selected theme (e.g., 'light', 'dark') */
  theme: string;
  /** User's preferred language code */
  language: string;
  /** User's notification preferences */
  notifications: boolean;
  // Add other preference properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private readonly PREFERENCES_KEY = 'preferences';

  constructor(private storageService: StorageService) { }

  /**
   * Saves user preferences to persistent storage
   * @param preferences The preferences object to save
   */
  savePreferences(preferences: UserPreferences): void {
    this.storageService.setItem(this.PREFERENCES_KEY, preferences);
  }

  /**
   * Retrieves user preferences from persistent storage
   * @returns The stored preferences object or null if not found
   */
  getPreferences(): UserPreferences | null {
    return this.storageService.getItem<UserPreferences>(this.PREFERENCES_KEY);
  }
}