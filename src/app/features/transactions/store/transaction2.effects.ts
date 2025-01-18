// transactions/store/transaction2.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { TransactionService } from '@features/transactions/services/transaction2.service';
import * as TransactionActions from '@features/transactions/store/transaction2.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TransactionEffects {
  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadTransactions),
      mergeMap(({ filters }) =>
        this.transactionService.getTransactions(filters).pipe(
          map((transactions) =>
            TransactionActions.loadTransactionsSuccess({ transactions })
          ),
          catchError((error) => {
            this.snackBar.open('Error loading transactions', 'Close', {
              duration: 3000,
            });
            return of({ type: '[Transaction] Load Error', payload: error });
          })
        )
      )
    )
  );

  addTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.addTransaction),
      switchMap(({ transaction }) =>
        this.transactionService.createTransaction(transaction).pipe(
          map(() => TransactionActions.loadTransactions({})),
          catchError((error) => {
            this.snackBar.open('Error adding transaction', 'Close', {
              duration: 3000,
            });
            return of({ type: '[Transaction] Add Error', payload: error });
          })
        )
      )
    )
  );

  updateTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.updateTransaction),
      switchMap(({ id, transaction }) =>
        this.transactionService.updateTransaction(id, transaction).pipe(
          map(() => TransactionActions.loadTransactions({})),
          catchError((error) => {
            this.snackBar.open('Error updating transaction', 'Close', {
              duration: 3000,
            });
            return of({ type: '[Transaction] Update Error', payload: error });
          })
        )
      )
    )
  );

  deleteTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.deleteTransaction),
      switchMap(({ id }) =>
        this.transactionService.deleteTransaction(id).pipe(
          map(() => TransactionActions.loadTransactions({})),
          catchError((error) => {
            this.snackBar.open('Error deleting transaction', 'Close', {
              duration: 3000,
            });
            return of({ type: '[Transaction] Delete Error', payload: error });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private transactionService: TransactionService,
    private snackBar: MatSnackBar
  ) {}
}
