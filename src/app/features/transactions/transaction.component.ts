// transactions/transaction.component.ts

import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { Transaction, TransactionFormData } from './types/transaction.types';
import { TransactionActions } from './store/transaction.actions';
import * as TransactionSelectors from './store/transaction.selectors';

/**
 * Main transaction component that displays the transaction list and manages transaction operations
 */
@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    FontAwesomeModule,
    TransactionFormComponent,
  ],
  templateUrl: './transaction.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      .mat-mdc-table {
        background: white;
      }

      .mat-mdc-row:hover {
        background: rgba(0, 0, 0, 0.04);
      }
    `,
  ],
})
export class TransactionComponent {
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  private readonly store = inject(Store);

  // Signals
  readonly showForm = signal(false);
  readonly selectedTransaction = signal<Transaction | null>(null);

  // Computed values
  readonly transactions = computed(() =>
    this.store.select(TransactionSelectors.selectAllTransactions)
  );

  readonly loading = computed(() =>
    this.store.select(TransactionSelectors.selectLoading)
  );

  // Table configuration
  readonly displayedColumns = ['date', 'amount', 'category', 'actions'];

  /**
   * Opens the add transaction modal
   */
  openAddTransactionModal(): void {
    this.selectedTransaction.set(null);
    this.showForm.set(true);
  }

  /**
   * Handles editing a transaction
   */
  editTransaction(transaction: Transaction): void {
    this.selectedTransaction.set(transaction);
    this.showForm.set(true);
  }

  /**
   * Handles deleting a transaction
   */
  deleteTransaction(transaction: Transaction): void {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.store.dispatch(
        TransactionActions.deleteTransaction({
          id: transaction.id,
        })
      );
    }
  }

  /**
   * Handles saving a transaction (create or update)
   */
  saveTransaction(data: TransactionFormData): void {
    const selectedTrans = this.selectedTransaction();
    if (selectedTrans) {
      this.store.dispatch(
        TransactionActions.updateTransaction({
          id: selectedTrans.id,
          data,
        })
      );
    } else {
      this.store.dispatch(TransactionActions.createTransaction({ data }));
    }
    this.showForm.set(false);
  }

  /**
   * Handles canceling the edit/create form
   */
  cancelEdit(): void {
    this.showForm.set(false);
    this.selectedTransaction.set(null);
  }
}
