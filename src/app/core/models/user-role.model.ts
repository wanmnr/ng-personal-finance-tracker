/**
 * @file user-role.model.ts
 * @description User role and permission definitions for access control system
 * @module Model
 *
 * @remarks
 * Implements role-based access control (RBAC) types:
 * - UserRole: Available user account levels
 * - UserPermissions: Associates users with roles and permissions
 */

export enum UserRole {
  FREE_USER = 'FREE_USER',
  PREMIUM_USER = 'PREMIUM_USER',
  ADMIN = 'ADMIN',
}

export interface UserPermissions {
  userId: string;
  role: UserRole;
  permissions: string[];
}
