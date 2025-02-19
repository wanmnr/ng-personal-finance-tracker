/**
 * @file transaction2.model.ts
 * @module app/features/transactions/models
 * @description Core transaction domain types and filter criteria
 */

import { TRANSACTION_TYPES } from './transaction2.constant';

/**
 * Valid transaction operation types
 */
export type TransactionType = (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];

/**
 * Interface representing a financial transaction
 * @interface Transaction
 */
export interface Transaction {
  id: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
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
  category?: string;
  type?: TransactionType;
  minAmount?: number;
  maxAmount?: number;
}
