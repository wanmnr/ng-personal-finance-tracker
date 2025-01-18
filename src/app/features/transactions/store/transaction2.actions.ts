// transactions/store/transaction2.actions.ts
import { createAction, props } from '@ngrx/store';
import { Transaction, TransactionFilters } from '../models/transaction2.model';

/**
 * NgRx actions for transaction management
 */
export const loadTransactions = createAction(
  '[Transaction] Load Transactions',
  props<{ filters?: TransactionFilters }>()
);

export const loadTransactionsSuccess = createAction(
  '[Transaction] Load Transactions Success',
  props<{ transactions: Transaction[] }>()
);

export const addTransaction = createAction(
  '[Transaction] Add Transaction',
  props<{ transaction: Omit<Transaction, 'id'> }>()
);

export const updateTransaction = createAction(
  '[Transaction] Update Transaction',
  props<{ id: string; transaction: Partial<Transaction> }>()
);

export const deleteTransaction = createAction(
  '[Transaction] Delete Transaction',
  props<{ id: string }>()
);
