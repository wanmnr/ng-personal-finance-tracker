/**
 * @file transaction2.constants.ts
 * @module app/features/transactions/models
 * @description Predefined transaction classification values
 */

/**
 * Standard transaction category options
 */
export const TRANSACTION_CATEGORIES = [
  'Groceries',
  'Rent',
  'Utilities',
  'Entertainment',
  'Transportation',
  'Other',
] as const;

/**
 * Available transaction operation types
 */
export const TRANSACTION_TYPES = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
} as const;
