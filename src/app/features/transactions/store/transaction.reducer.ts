// transactions/store/transaction.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { TransactionActions } from './transaction.actions';
import { TransactionState } from '../types/transaction.types';

const initialState: TransactionState = {
  transactions: [],
  selectedTransaction: null,
  loading: false,
  error: null
};

export const transactionReducer = createReducer(
  initialState,

  // Load Transactions
  on(TransactionActions.loadTransactions, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TransactionActions.loadTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
    loading: false
  })),

  on(TransactionActions.loadTransactionsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Create Transaction
  on(TransactionActions.createTransaction, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TransactionActions.createTransactionSuccess, (state, { transaction }) => ({
    ...state,
    transactions: [...state.transactions, transaction],
    loading: false
  })),

  on(TransactionActions.createTransactionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Update Transaction
  on(TransactionActions.updateTransaction, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TransactionActions.updateTransactionSuccess, (state, { transaction }) => ({
    ...state,
    transactions: state.transactions.map(t =>
      t.id === transaction.id ? transaction : t
    ),
    loading: false
  })),

  on(TransactionActions.updateTransactionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Delete Transaction
  on(TransactionActions.deleteTransaction, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TransactionActions.deleteTransactionSuccess, (state, { id }) => ({
    ...state,
    transactions: state.transactions.filter(t => t.id !== id),
    loading: false
  })),

  on(TransactionActions.deleteTransactionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  // Select Transaction
  on(TransactionActions.selectTransaction, (state, { transaction }) => ({
    ...state,
    selectedTransaction: transaction
  }))
);
