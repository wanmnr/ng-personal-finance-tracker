/**
 * @file permission.service.ts
 * @module app/core/services
 * @description Role-based permission management service for controlling feature access
 *
 * @remarks
 * Manages user permissions based on user type (FREE, PREMIUM, ADMIN).
 * Key features:
 * - Predefined permission sets for different user types
 * - Individual and batch permission checks
 * - Immutable permission access
 *
 * Required imports:
 * - Permission type from @core/types/permission.types
 * - Permission set constants from @core/types/permission-sets.types
 *
 * @example
 * Basic usage in components:
 * ```typescript
 * export class MyComponent {
 *   constructor(private permissionService: PermissionService) {
 *     // Set user permissions based on type
 *     this.permissionService.setUserPermissions('PREMIUM');
 *
 *     // Check single permission
 *     if (this.permissionService.hasPermission('VIEW_DASHBOARD')) {
 *       // Allow access to dashboard
 *     }
 *   }
 * }
 * ```
 *
 * Advanced usage with multiple permission checks:
 * ```typescript
 * export class AdvancedComponent {
 *   constructor(private permissionService: PermissionService) {
 *     // Check multiple permissions
 *     const requiredPermissions = ['EDIT_PROFILE', 'DELETE_ACCOUNT'];
 *     if (this.permissionService.hasPermissions(requiredPermissions)) {
 *       // Allow access to sensitive operations
 *     }
 *   }
 * }
 * ```
 */

import { Injectable } from '@angular/core';
import { Permission } from '@core/types/permission.types';
import {
  FREE_USER_PERMISSIONS,
  PREMIUM_USER_PERMISSIONS,
  ADMIN_PERMISSIONS,
} from '@core/types/permission-sets.types';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private userPermissions: Permission[] = [];

  /**
   * Sets user permissions based on user type
   * @param userType The type of user to set permissions for
   */
  setUserPermissions(userType: 'FREE' | 'PREMIUM' | 'ADMIN') {
    switch (userType) {
      case 'FREE':
        this.userPermissions = FREE_USER_PERMISSIONS;
        break;
      case 'PREMIUM':
        this.userPermissions = PREMIUM_USER_PERMISSIONS;
        break;
      case 'ADMIN':
        this.userPermissions = ADMIN_PERMISSIONS;
        break;
      default:
        this.userPermissions = [];
    }
  }

  /**
   * Checks if user has a specific permission
   * @param permission The permission to check
   * @returns True if user has the permission, false otherwise
   */
  hasPermission(permission: Permission): boolean {
    return this.userPermissions.includes(permission);
  }

  /**
   * Checks if user has all specified permissions
   * @param permissions Array of permissions to check
   * @returns True if user has all permissions, false otherwise
   */
  hasPermissions(permissions: Permission[]): boolean {
    return permissions.every((permission) => this.hasPermission(permission));
  }

  /**
   * Retrieves current user permissions
   * @returns Copy of current user permissions array
   */
  getUserPermissions(): Permission[] {
    return [...this.userPermissions];
  }
}
