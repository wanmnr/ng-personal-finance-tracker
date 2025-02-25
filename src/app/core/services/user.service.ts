/**
 * @file user.service.ts
 * @module UserService
 * @description Manages user profile data, role validation, and preference operations
 *
 * @remarks
 * This service provides:
 * - User profile CRUD operations
 * - Role-based access validation
 * - User preferences management
 *
 * Integration notes:
 * - Requires HttpClientModule in the app module
 * - Expects UserProfile model from @core/models
 * - API endpoints must be configured for /api/users/*
 *
 * Error handling:
 * - Profile fetch errors are logged and propagated
 * - HTTP errors are transformed into observable errors
 *
 * @example
 * Profile operations:
 * ```typescript
 * // Fetch user profile
 * userService.getUserProfile('123').subscribe(
 *   profile => console.log(profile),
 *   error => handleError(error)
 * );
 *
 * // Update user preferences
 * userService.updatePreferences({
 *   theme: 'dark',
 *   language: 'en',
 *   notifications: true
 * }).subscribe();
 *
 * // Validate user role
 * userService.validateUserRole('123', 'admin').subscribe(
 *   isValid => console.log(`Has role: ${isValid}`)
 * );
 * ```
 */

import { catchError, Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { UserProfile } from '@core/models/user.model';
import { ApiService } from '@core/services/api.service';

/**
 * User preferences configuration interface
 */
interface UserPreferences {
  /** User's selected theme */
  theme: string;
  /** User's preferred language */
  language: string;
  /** User's notification preferences */
  notifications: boolean;
}

export class UserService {
  private apiService = inject(ApiService);

  /**
   * Retrieves user profile information
   * @param userId Unique identifier of the user
   * @returns Observable of UserProfile
   * @throws HTTP errors wrapped in Observable
   */
  getUserProfile(userId: string): Observable<UserProfile> {
    return this.apiService.get<UserProfile>(`users/${userId}`).pipe(
      catchError((error) => {
        console.error('Error fetching user profile:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Validates if a user has a specific role
   * @param userId Unique identifier of the user
   * @param role Role to validate
   * @returns Observable of boolean indicating role validity
   */
  validateUserRole(userId: string, role: string): Observable<boolean> {
    return this.apiService.get<boolean>(
      `users/${userId}/validate-role/${role}`
    );
  }

  /**
   * Updates user profile information
   * @param userId Unique identifier of the user
   * @param data Updated profile data
   * @returns Observable of the update operation
   */
  updateProfile(userId: string, data: UserProfile) {
    return this.apiService.put(`users/${userId}`, data);
  }

  /**
   * Updates user preferences
   * @param preferences Updated preference settings
   * @returns Observable of the update operation
   */
  updatePreferences(preferences: UserPreferences) {
    return this.apiService.put('users/preferences', preferences);
  }
}
