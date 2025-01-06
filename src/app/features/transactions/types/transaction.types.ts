// @features/transaction/types/transaction.types.ts

/**
 * Represents the status of a transaction
 */
export type TransactionStatus = 'pending' | 'completed' | 'failed';

/**
 * Represents a transaction category
 */
export interface TransactionCategory {
  id: string;
  name: string;
  icon: string;
  type: 'income' | 'expense';
}

/**
 * Represents a single transaction
 */
export interface Transaction {
  id: string;
  amount: number;
  category: TransactionCategory;
  date: Date;
  notes?: string;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents the transaction state in the store
 */
export interface TransactionState {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  loading: boolean;
  error: string | null;
}

/**
 * Represents the form data for creating/editing a transaction
 */
export interface TransactionFormData {
  amount: number;
  categoryId: string;
  date: Date;
  notes?: string;
}
