// components/transaction2/transaction2.component.ts

import {
  ChangeDetectionStrategy,
  Component,
  importProvidersFrom,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from '@features/transactions/models/transaction2.model';
import { TransactionListComponent } from '@features/transactions/transaction-list/transaction2-list.component';
import * as TransactionActions from '@features/transactions/store//transaction2.actions';

interface AppState {
  transactions: {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
  };
}

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    TransactionListComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="transaction-container p-4">
      <mat-card>
        <mat-card-content>
          <!-- Quick Summary Bar -->
          <div class="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 class="text-sm font-medium text-gray-500">Total Income</h3>
              <p class="text-lg font-semibold text-green-600">
                {{ getTotalIncome(transactions$ | async) | currency }}
              </p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500">Total Expenses</h3>
              <p class="text-lg font-semibold text-red-600">
                {{ getTotalExpenses(transactions$ | async) | currency }}
              </p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500">Net Balance</h3>
              <p
                [ngClass]="getBalanceClass(transactions$ | async)"
                class="text-lg font-semibold"
              >
                {{ getNetBalance(transactions$ | async) | currency }}
              </p>
            </div>
          </div>

          <!-- Main Transaction List -->
          <app-transaction-list></app-transaction-list>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .transaction-container {
        display: block;
        height: 100%;
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
      }

      mat-card {
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class TransactionComponent implements OnInit {
  transactions$: Observable<Transaction[]>;

  constructor(private store: Store<AppState>) {
    this.transactions$ = this.store.select(
      (state) => state.transactions.transactions
    );
  }

  ngOnInit(): void {
    // Load initial transactions
    this.store.dispatch(TransactionActions.loadTransactions({}));
  }

  getTotalIncome(transactions: Transaction[] | null): number {
    if (!transactions) return 0;
    return transactions
      .filter((t) => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalExpenses(transactions: Transaction[] | null): number {
    if (!transactions) return 0;
    return transactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getNetBalance(transactions: Transaction[] | null): number {
    return (
      this.getTotalIncome(transactions) - this.getTotalExpenses(transactions)
    );
  }

  getBalanceClass(transactions: Transaction[] | null): string {
    const balance = this.getNetBalance(transactions);
    return balance >= 0 ? 'text-green-600' : 'text-red-600';
  }
}
