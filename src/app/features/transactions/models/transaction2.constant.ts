// transaction2.constants.ts
export const TRANSACTION_CATEGORIES = [
  'Groceries',
  'Rent',
  'Utilities',
  'Entertainment',
  'Transportation',
  'Other',
] as const;

export const TRANSACTION_TYPES = {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
} as const;
