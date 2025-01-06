// transactions/store/transaction.actions.ts

import { createActionGroup, props } from '@ngrx/store';
import { Transaction, TransactionFormData } from '../types/transaction.types';

export const TransactionActions = createActionGroup({
  source: 'Transaction',
  events: {
    'Load Transactions': props<{ force?: boolean }>(),
    'Load Transactions Success': props<{ transactions: Transaction[] }>(),
    'Load Transactions Failure': props<{ error: string }>(),

    'Create Transaction': props<{ data: TransactionFormData }>(),
    'Create Transaction Success': props<{ transaction: Transaction }>(),
    'Create Transaction Failure': props<{ error: string }>(),

    'Update Transaction': props<{ id: string; data: TransactionFormData }>(),
    'Update Transaction Success': props<{ transaction: Transaction }>(),
    'Update Transaction Failure': props<{ error: string }>(),

    'Delete Transaction': props<{ id: string }>(),
    'Delete Transaction Success': props<{ id: string }>(),
    'Delete Transaction Failure': props<{ error: string }>(),

    'Select Transaction': props<{ transaction: Transaction | null }>()
  }
});
