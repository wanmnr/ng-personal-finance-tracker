// transactions/store/transaction.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionState } from '../types/transaction.types';

export const selectTransactionState =
  createFeatureSelector<TransactionState>('transactions');

export const selectAllTransactions = createSelector(
  selectTransactionState,
  state => state.transactions
);

export const selectSelectedTransaction = createSelector(
  selectTransactionState,
  state => state.selectedTransaction
);

export const selectLoading = createSelector(
  selectTransactionState,
  state => state.loading
);

export const selectError = createSelector(
  selectTransactionState,
  state => state.error
);

export const selectTransactionsTotalAmount = createSelector(
  selectAllTransactions,
  transactions => transactions.reduce((total, t) => total + t.amount, 0)
);

export const selectTransactionsByCategory = createSelector(
  selectAllTransactions,
  transactions => {
    return transactions.reduce((acc, transaction) => {
      const categoryId = transaction.category.id;
      if (!acc[categoryId]) {
        acc[categoryId] = [];
      }
      acc[categoryId].push(transaction);
      return acc;
    }, {} as { [key: string]: typeof transactions });
  }
);

// export const selectBudgetCategories = createSelector(
//   selectBudgetState,
//   (budget) => Object.keys(budget.categories)
// );

// export const selectTransactionDates = createSelector(
//   selectTransactionState,
//   (transactions) => transactions.map(t => t.date)
// );

// export const selectTransactionAmounts = createSelector(
//   selectTransactionState,
//   (transactions) => transactions.map(t => t.amount)
// );
