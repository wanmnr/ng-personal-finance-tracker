// components/transaction2-table/transaction-table.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Transaction } from '@features/transactions/models/transaction2.model';
import { MYRCurrencyPipe } from '@app/shared/pipes/myr-currency.pipe';

/**
 * Presentational component for displaying transactions in a table format
 * @class TransactionTableComponent
 */
@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatChipsModule,
    FontAwesomeModule,
    DatePipe,
    MYRCurrencyPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="overflow-x-auto">
      <table
        mat-table
        [dataSource]="dataSource"
        class="w-full"
        aria-label="Transactions table"
      >
        <!-- Date Column -->
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let transaction">
            {{ transaction.date | date : 'mediumDate' }}
          </td>
        </ng-container>

        <!-- Type Column -->
        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let transaction">
            <span
              [class]="
                transaction.type === 'INCOME'
                  ? 'text-green-600'
                  : 'text-red-600'
              "
              class="font-semibold"
            >
              {{ transaction.type }}
            </span>
          </td>
        </ng-container>

        <!-- Amount Column -->
        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef>Amount</th>
          <td
            mat-cell
            *matCellDef="let transaction"
            [class]="
              transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
            "
          >
            {{ transaction.amount | myrCurrency }}
          </td>
        </ng-container>

        <!-- Category Column -->
        <ng-container matColumnDef="category">
          <th mat-header-cell *matHeaderCellDef>Category</th>
          <td mat-cell *matCellDef="let transaction">
            <mat-chip-row>{{ transaction.category }}</mat-chip-row>
          </td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let transaction">
            <button
              mat-icon-button
              color="primary"
              (click)="edit.emit(transaction)"
              aria-label="Edit transaction"
            >
              <fa-icon [icon]="faEdit"></fa-icon>
            </button>
            <button
              mat-icon-button
              color="warn"
              (click)="delete.emit(transaction.id)"
              aria-label="Delete transaction"
            >
              <fa-icon [icon]="faTrash"></fa-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>

        <!-- No Data Row -->
        <tr class="mat-row" *matNoDataRow>
          <td class="mat-cell text-center py-4" colspan="5">
            No transactions found
          </td>
        </tr>
      </table>

      <mat-paginator
        [pageSize]="10"
        [pageSizeOptions]="[5, 10, 25, 100]"
        aria-label="Select page of transactions"
      >
      </mat-paginator>
    </div>
  `
})
export class TransactionTableComponent {
  @Input() set transactions(value: Transaction[] | null) {
    if (value) {
      this.dataSource.data = value;
    }
  }
  @Output() edit = new EventEmitter<Transaction>();
  @Output() delete = new EventEmitter<string>();

  dataSource = new MatTableDataSource<Transaction>([]);
  displayedColumns = ['date', 'type', 'amount', 'category', 'actions'];
  faEdit = faEdit;
  faTrash = faTrash;
}
