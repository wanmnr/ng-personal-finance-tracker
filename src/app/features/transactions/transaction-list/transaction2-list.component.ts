// transactions/transaction2-list/transaction-list.component.ts
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  Transaction,
  TransactionFilters,
} from '@features/transactions/models/transaction2.model';
import * as TransactionActions from '@features/transactions/store/transaction2.actions';
import { TransactionDialogComponent } from '../transaction-dialog/transaction2-dialog.component';
import { TransactionFiltersComponent } from '../transaction-filters/transaction2-filters.component';
import { TransactionTableComponent } from '../transaction-table/transaction2-table.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';

interface AppState {
  transactions: {
    transactions: Transaction[];
  };
}

interface TransactionDialogData {
  transaction?: Transaction;
}

/**
 * Smart component handling transaction list display and management
 * @class TransactionListComponent
 */
@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    CommonModule,
    TransactionFiltersComponent,
    TransactionTableComponent,
    FontAwesomeModule,
    MatButtonModule,
    MatDialogModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Transactions</h1>
        <button
          mat-raised-button
          color="primary"
          (click)="openTransactionDialog()"
          class="flex items-center gap-2"
        >
          <fa-icon [icon]="faPlus"></fa-icon>
          <span>Add Transaction</span>
        </button>
      </div>

      <app-transaction-filters
        (filtersChanged)="onFiltersChanged($event)"
      ></app-transaction-filters>

      <app-transaction-table
        [transactions]="transactions$ | async"
        (edit)="editTransaction($event)"
        (delete)="deleteTransaction($event)"
      ></app-transaction-table>
    </div>
  `,
})
export class TransactionListComponent implements OnInit {
  transactions$: Observable<Transaction[]>;
  faPlus = faPlus; // from @fortawesome/free-solid-svg-icons

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.transactions$ = this.store.select(
      (state) => state.transactions.transactions
    );
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(filters?: TransactionFilters): void {
    this.store.dispatch(TransactionActions.loadTransactions({ filters }));
  }

  openTransactionDialog(transaction?: Transaction): void {
    const dialogRef = this.dialog.open<
      TransactionDialogComponent,
      TransactionDialogData
    >(TransactionDialogComponent, {
      width: '500px',
      data: { transaction },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (transaction) {
          this.store.dispatch(
            TransactionActions.updateTransaction({
              id: transaction.id,
              transaction: result,
            })
          );
        } else {
          this.store.dispatch(
            TransactionActions.addTransaction({
              transaction: result,
            })
          );
        }
      }
    });
  }

  onFiltersChanged(filters: TransactionFilters): void {
    this.loadTransactions(filters);
  }

  editTransaction(transaction: Transaction): void {
    this.openTransactionDialog(transaction);
  }

  deleteTransaction(id: string): void {
    this.store.dispatch(TransactionActions.deleteTransaction({ id }));
  }
}
