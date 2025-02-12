/**
 * @file permission.types.ts
 * @module core/permissions
 * @description Core permission enumeration for application access control
 *
 * @remarks
 * Represents all available permissions in the application using TypeScript enum.
 * Permissions follow a logical grouping:
 * - View permissions: Read-only access to specific features
 * - Manage permissions: Full CRUD capabilities for specific features
 * - Administrative permissions: System-level access
 *
 * Integration points:
 * - Used by permission guards and decorators
 * - Referenced in role-based access control
 * - Required for permission middleware
 *
 * @example
 * Using in permission checks:
 * ```typescript
 * if (userPermission === Permission.VIEW_TRANSACTIONS) {
 *   // Handle view access
 * }
 * ```
 *
 * Using with permission arrays:
 * ```typescript
 * const requiredPermissions: Permission[] = [
 *   Permission.VIEW_TRANSACTIONS,
 *   Permission.MANAGE_TRANSACTIONS
 * ];
 * ```
 */
export enum Permission {
  VIEW_TRANSACTIONS = 'VIEW_TRANSACTIONS',
  MANAGE_TRANSACTIONS = 'MANAGE_TRANSACTIONS',
  VIEW_BUDGETS = 'VIEW_BUDGETS',
  MANAGE_BUDGETS = 'MANAGE_BUDGETS',
  VIEW_REPORTS = 'VIEW_REPORTS',
  MANAGE_ACCOUNT = 'MANAGE_ACCOUNT',
  MANAGE_USERS = 'MANAGE_USERS',
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
}