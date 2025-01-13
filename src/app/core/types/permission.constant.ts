// core/constants/permissions.constant.ts

export const Permissions = {
  VIEW_TRANSACTIONS: 'VIEW_TRANSACTIONS',
  MANAGE_TRANSACTIONS: 'MANAGE_TRANSACTIONS',
  VIEW_BUDGETS: 'VIEW_BUDGETS',
  MANAGE_BUDGETS: 'MANAGE_BUDGETS',
  VIEW_REPORTS: 'VIEW_REPORTS',
  MANAGE_ACCOUNT: 'MANAGE_ACCOUNT',
} as const;

export type Permission = keyof typeof Permissions;
