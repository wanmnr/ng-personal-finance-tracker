/**
 * @file permission.utils.ts
 * @module core/utils/permission
 * @description Permission validation utility functions for access control
 *
 * @remarks
 * Provides core permission checking functionality:
 * - Validates user permissions against required access levels
 * - Returns true if user has all required permissions
 * - Always returns true if no permissions are required
 * - Uses array inclusion checking for permission matching
 *
 * @example
 * Basic permission check:
 * ```typescript
 * const userPerms = ['READ', 'WRITE'];
 * const required = ['READ'];
 * checkPermissions(userPerms, required); // returns true
 * ```
 *
 * Complex permission check:
 * ```typescript
 * const userPerms = ['READ'];
 * const required = ['READ', 'WRITE'];
 * checkPermissions(userPerms, required); // returns false
 * ```
 *
 * @param userPermissions - Array of permission strings assigned to user
 * @param requiredPermissions - Array of permission strings required for access
 * @returns Boolean indicating if user has all required permissions
 */
export function checkPermissions(
  userPermissions: string[],
  requiredPermissions: string[]
): boolean {
  if (!requiredPermissions?.length) {
    return true;
  }

  return requiredPermissions.every((permission) => userPermissions.includes(permission));
}
