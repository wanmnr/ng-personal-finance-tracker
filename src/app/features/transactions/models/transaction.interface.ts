// models/transaction2.model.ts

import { Category } from '@app/features/dashboard/models/category.model';
import { TRANSACTION_TYPES } from './transaction2.constant';

export type TransactionType = typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES];

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

export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  selectedTransaction: Transaction | null;
}
