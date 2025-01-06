// transactions/store/transaction.effects.ts

import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionActions } from './transaction.actions';
import { TransactionService } from '../services/transaction.service';

/**
 * Effects for handling transaction-related side effects
 */
@Injectable()
export class TransactionEffects {
  private readonly actions$ = inject(Actions);
  private readonly transactionService = inject(TransactionService);
  private readonly store = inject(Store);
  private readonly snackBar = inject(MatSnackBar);

  /**
   * Effect to load transactions
   */
  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadTransactions),
      mergeMap(() =>
        this.transactionService.getTransactions().pipe(
          map(transactions =>
            TransactionActions.loadTransactionsSuccess({ transactions })
          ),
          catchError(error =>
            of(TransactionActions.loadTransactionsFailure({
              error: error.message
            }))
          )
        )
      )
    )
  );

  /**
   * Effect to create a transaction
   */
  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.createTransaction),
      mergeMap(({ data }) =>
        this.transactionService.createTransaction(data).pipe(
          map(transaction =>
            TransactionActions.createTransactionSuccess({ transaction })
          ),
          catchError(error =>
            of(TransactionActions.createTransactionFailure({
              error: error.message
            }))
          )
        )
      )
    )
  );

  /**
   * Effect to update a transaction
   */
  updateTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.updateTransaction),
      mergeMap(({ id, data }) =>
        this.transactionService.updateTransaction(id, data).pipe(
          map(transaction =>
            TransactionActions.updateTransactionSuccess({ transaction })
          ),
          catchError(error =>
            of(TransactionActions.updateTransactionFailure({
              error: error.message
            }))
          )
        )
      )
    )
  );

  /**
   * Effect to delete a transaction
   */
  deleteTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.deleteTransaction),
      mergeMap(({ id }) =>
        this.transactionService.deleteTransaction(id).pipe(
          map(() => TransactionActions.deleteTransactionSuccess({ id })),
          catchError(error =>
            of(TransactionActions.deleteTransactionFailure({
              error: error.message
            }))
          )
        )
      )
    )
  );

  /**
   * Effect to show success messages
   */
  showSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TransactionActions.createTransactionSuccess,
        TransactionActions.updateTransactionSuccess,
        TransactionActions.deleteTransactionSuccess
      ),
      tap(action => {
        let message = '';
        switch (action.type) {
          case '[Transaction] Create Transaction Success':
            message = 'Transaction created successfully';
            break;
          case '[Transaction] Update Transaction Success':
            message = 'Transaction updated successfully';
            break;
          case '[Transaction] Delete Transaction Success':
            message = 'Transaction deleted successfully';
            break;
        }
        this.snackBar.open(message, 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      })
    ),
    { dispatch: false }
  );

  /**
   * Effect to show error messages
   */
  showError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TransactionActions.createTransactionFailure,
        TransactionActions.updateTransactionFailure,
        TransactionActions.deleteTransactionFailure,
        TransactionActions.loadTransactionsFailure
      ),
      tap(({ error }) => {
        this.snackBar.open(error, 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      })
    ),
    { dispatch: false }
  );
}
