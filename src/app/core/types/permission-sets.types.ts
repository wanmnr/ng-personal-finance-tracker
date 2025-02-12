/**
 * @file permission-sets.ts
 * @module core/permissions
 * @description Defines permission sets for different user roles in the application
 *
 * @remarks
 * Permission sets are hierarchical, with each tier inheriting permissions from lower tiers:
 * - Free users: Basic transaction and viewing capabilities
 * - Premium users: Inherit free permissions plus advanced management features
 * - Admins: Full system access including user management
 *
 * Integration points:
 * - Used by authorization guards
 * - Referenced in user role management
 * - Required for permission-based UI rendering
 *
 * @example
 * Checking user permissions:
 * ```typescript
 * const hasAccess = userPermissions.some(
 *   permission => PREMIUM_USER_PERMISSIONS.includes(permission)
 * );
 * ```
 *
 * Combining with custom permissions:
 * ```typescript
 * const customPermissions = [
 *   ...FREE_USER_PERMISSIONS,
 *   Permission.CUSTOM_PERMISSION
 * ];
 * ```
 */
import { Permission } from './permission.types';

export const FREE_USER_PERMISSIONS: Permission[] = [
  Permission.VIEW_TRANSACTIONS,
  Permission.MANAGE_TRANSACTIONS,
  Permission.VIEW_BUDGETS,
  Permission.VIEW_REPORTS
];

export const PREMIUM_USER_PERMISSIONS: Permission[] = [
  ...FREE_USER_PERMISSIONS,
  Permission.MANAGE_BUDGETS,
  Permission.MANAGE_ACCOUNT
];

export const ADMIN_PERMISSIONS: Permission[] = [
  ...PREMIUM_USER_PERMISSIONS,
  Permission.MANAGE_USERS,
  Permission.VIEW_ANALYTICS
];
