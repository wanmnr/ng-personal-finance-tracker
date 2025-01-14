// features/reports/components/expense-breakdown/expense-breakdown.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

interface ExpenseData {
  category: string;
  amount: number;
  date: Date;
  description?: string;
}

@Component({
  selector: 'app-expense-breakdown',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  template: `
    <mat-card class="expense-breakdown">
      <mat-card-header>
        <mat-card-title>Expense Breakdown</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="data" class="w-full">
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let expense">
              {{ expense.date | date : 'shortDate' }}
            </td>
          </ng-container>

          <ng-container matColumnDef="category">
            <th mat-header-cell *matHeaderCellDef>Category</th>
            <td mat-cell *matCellDef="let expense">{{ expense.category }}</td>
          </ng-container>

          <ng-container matColumnDef="amount">
            <th mat-header-cell *matHeaderCellDef>Amount</th>
            <td mat-cell *matCellDef="let expense">
              {{ expense.amount | currency }}
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .expense-breakdown {
        margin: 1rem;
      }
      table {
        width: 100%;
      }
    `,
  ],
})
export class ExpenseBreakdownComponent {
  @Input() data: ExpenseData[] = [];
  displayedColumns: string[] = ['date', 'category', 'amount'];
}
