/**
 * @file transaction.model.ts
 * @module app/features/transactions/models
 * @description Core transaction domain models and state management interfaces
 */

import { Category } from '@app/features/dashboard/models/category.model';
import { TRANSACTION_TYPES } from './transaction2.constant';

/**
 * Valid transaction type values derived from TRANSACTION_TYPES constant
 */
export type TransactionType = (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];

/**
 * Interface representing a financial transaction
 * @interface Transaction
 */
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: Category;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Type representing transaction filter options
 * @type TransactionFilters
 */
export interface TransactionFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  category?: Category;
  type?: TransactionType;
  minAmount?: number;
  maxAmount?: number;
}

/**
 * Manages transaction data and UI state
 */
export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  selectedTransaction: Transaction | null;
}
