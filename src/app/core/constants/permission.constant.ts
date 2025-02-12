/**
 * @file permissions.constant.ts
 * @module core/constants
 * @description Application permission constants and types
 *
 * @remarks
 * Defines the core permission structure used throughout the application.
 * Permission strings are maintained as constants to ensure type safety
 * and enable static code analysis.
 *
 * Key features:
 * - Immutable permission constants
 * - Type-safe permission keys
 * - TypeScript const assertions for literal types
 *
 * @example
 * Using permission constants:
 * ```typescript
 * if (userPermissions.includes(Permissions.VIEW_TRANSACTIONS)) {
 *   // Handle authorized access
 * }
 * ```
 *
 * Type-safe permission handling:
 * ```typescript
 * const checkPermission = (permission: Permission) => {
 *   return userHasPermission(permission);
 * };
 * ```
 */
export const Permissions = {
  VIEW_TRANSACTIONS: 'VIEW_TRANSACTIONS',
  MANAGE_TRANSACTIONS: 'MANAGE_TRANSACTIONS',
  VIEW_BUDGETS: 'VIEW_BUDGETS',
  MANAGE_BUDGETS: 'MANAGE_BUDGETS',
  VIEW_REPORTS: 'VIEW_REPORTS',
  MANAGE_ACCOUNT: 'MANAGE_ACCOUNT',
} as const;

export type Permission = keyof typeof Permissions;
