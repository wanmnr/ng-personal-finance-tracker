/**
 * @file user1.service.ts
 * @module Core/Services/UserPermissions
 * @description Manages user permissions retrieval from Firestore database
 *
 * @remarks
 * This service provides:
 * - Firestore-based permission management
 * - Real-time permission data access
 * - Root-level singleton instance
 *
 * Integration requirements:
 * - Requires @angular/fire configuration in app.module
 * - Needs Firestore 'users' collection with permissions field
 * - Depends on UserPermissions model from @core/models
 *
 * @example
 * Retrieve user permissions:
 * ```typescript
 * constructor(private userService: UserService) {
 *   userService.getUserPermissions('user123').subscribe(
 *     permissions => {
 *       // Handle permissions array
 *       if (permissions.includes('admin')) {
 *         // Enable admin features
 *       }
 *     }
 *   );
 * }
 * ```
 *
 * Expected Firestore document structure:
 * ```typescript
 * {
 *   permissions: string[] // e.g., ['read', 'write', 'admin']
 * }
 * ```
 */

import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { UserPermissions } from '@core/models/user-role.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  /**
   * Firestore instance for database operations
   * @private
   */
  private readonly firestore = inject(Firestore);

  /**
   * Retrieves user permissions from Firestore
   * @param userId Unique identifier of the user
   * @returns Observable of string array containing user permissions
   *
   * @remarks
   * Returns empty array if:
   * - User document doesn't exist
   * - Permissions field is not set
   * - Permission array is empty
   */
  getUserPermissions(userId: string): Observable<string[]> {
    const userDoc = doc(this.firestore, `users/${userId}`);

    return from(getDoc(userDoc)).pipe(
      map((docSnap) => {
        if (!docSnap.exists()) {
          return [];
        }

        const userData = docSnap.data() as UserPermissions;
        return userData.permissions || [];
      })
    );
  }
}