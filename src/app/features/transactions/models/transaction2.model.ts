// models/transaction.model.ts
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
export type TransactionFilters = {
  dateRange?: { start: Date; end: Date };
  category?: string;
  type?: 'INCOME' | 'EXPENSE';
  minAmount?: number;
  maxAmount?: number;
};
