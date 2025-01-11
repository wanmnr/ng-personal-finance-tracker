// src/app/core/permissions/permission-sets.ts

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
