// transactions/transaction-list/transaction-list.component.ts

import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Transaction } from '@app/features/transactions/models/transaction1.interface';

/**
 * Component for displaying the list of transactions in a table format
 */
@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
  template: `
    <div class="overflow-x-auto">
      <table
        mat-table
        [dataSource]="dataSource"
        matSort
        class="w-full"
        aria-label="Transactions table"
      >
        <!-- Date Column -->
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef mat-sort-header scope="col">
            Date
          </th>
          <td mat-cell *matCellDef="let transaction">
            {{ transaction.date | date : 'mediumDate' }}
          </td>
        </ng-container>

        <!-- Amount Column -->
        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef mat-sort-header scope="col">
            Amount
          </th>
          <td
            mat-cell
            *matCellDef="let transaction"
            [ngClass]="{
              'text-green-600': transaction.amount > 0,
              'text-red-600': transaction.amount < 0
            }"
          >
            {{ transaction.amount | currency }}
          </td>
        </ng-container>

        <!-- Category Column -->
        <ng-container matColumnDef="category">
          <th mat-header-cell *matHeaderCellDef mat-sort-header scope="col">
            Category
          </th>
          <td mat-cell *matCellDef="let transaction">
            <div class="flex items-center gap-2">
              <fa-icon
                [icon]="transaction.category.icon"
                [title]="transaction.category.name"
              ></fa-icon>
              <span>{{ transaction.category.name }}</span>
            </div>
          </td>
        </ng-container>

        <!-- Notes Column -->
        <ng-container matColumnDef="notes">
          <th mat-header-cell *matHeaderCellDef scope="col">Notes</th>
          <td mat-cell *matCellDef="let transaction">
            {{ transaction.notes }}
          </td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef class="w-24" scope="col">
            Actions
          </th>
          <td mat-cell *matCellDef="let transaction">
            <div class="flex gap-2">
              <button
                mat-icon-button
                color="primary"
                (click)="edit.emit(transaction)"
                aria-label="Edit transaction"
              >
                <fa-icon icon="edit"></fa-icon>
              </button>
              <button
                mat-icon-button
                color="warn"
                (click)="delete.emit(transaction)"
                aria-label="Delete transaction"
              >
                <fa-icon icon="trash"></fa-icon>
              </button>
            </div>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr
          mat-row
          *matRowDef="let row; columns: displayedColumns"
          class="hover:bg-gray-50"
        ></tr>

        <!-- No Data Row -->
        <tr class="mat-row" *matNoDataRow>
          <td
            class="mat-cell text-center py-4"
            [attr.colspan]="displayedColumns.length"
          >
            No transactions found
          </td>
        </tr>
      </table>

      <mat-paginator
        [pageSize]="10"
        [pageSizeOptions]="[5, 10, 25, 100]"
        aria-label="Select page of transactions"
      ></mat-paginator>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .mat-mdc-row:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }
    `,
  ],
})
export class TransactionListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() set transactions(value: Transaction[]) {
    this.dataSource.data = value;
  }

  @Output() edit = new EventEmitter<Transaction>();
  @Output() delete = new EventEmitter<Transaction>();

  readonly displayedColumns = [
    'date',
    'amount',
    'category',
    'notes',
    'actions',
  ];
  readonly dataSource = new MatTableDataSource<Transaction>();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Applies filter to the table data
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
