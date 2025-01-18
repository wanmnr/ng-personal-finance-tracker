// transactions/store/transaction2.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Transaction } from '../models/transaction2.model';
import * as TransactionActions from './transaction2.actions';

/**
 * Interface representing transaction state
 * @interface TransactionState
 */
export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

export const transactionReducer = createReducer(
  initialState,
  on(TransactionActions.loadTransactions, (state) => ({
    ...state,
    loading: true,
  })),
  on(TransactionActions.loadTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
    loading: false,
  }))
);
