// transactions/models/transaction2.interface.ts
/**
 * @file transaction1.interface.ts
 * @module app/feautures/transactions/models
 * @description Core transaction data structure for financial operations
 */

import { Category } from '@app/features/dashboard/models/category.model';

/**
 * Defines the structure of a financial transaction entry
 */
export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: Category;
  description: string;
  date: Date;
}
