// components/transaction2-dialog/transaction-dialog.component.ts
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { TRANSACTION_CATEGORIES, TRANSACTION_TYPES } from '../models/transaction2.constant';
import { Transaction } from '../models/transaction2.model';

/**
 * Dialog component for adding/editing transactions
 * @class TransactionDialogComponent
 */
@Component({
  selector: 'app-transaction-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 mat-dialog-title>
      {{ data.transaction ? 'Edit' : 'Add' }} Transaction
    </h2>

    <form [formGroup]="transactionForm" (ngSubmit)="onSubmit()">
      <mat-dialog-content class="mat-typography">
        <div class="grid grid-cols-1 gap-4">
          <!-- Type -->
          <mat-form-field appearance="outline">
            <mat-label>Type</mat-label>
            <mat-select formControlName="type" required>
              <mat-option value="INCOME">Income</mat-option>
              <mat-option value="EXPENSE">Expense</mat-option>
            </mat-select>
            <mat-error
              *ngIf="transactionForm.get('type')?.hasError('required')"
            >
              Type is required
            </mat-error>
          </mat-form-field>

          <!-- Amount -->
          <mat-form-field appearance="outline">
            <mat-label>Amount</mat-label>
            <input
              matInput
              type="number"
              formControlName="amount"
              required
              min="0"
              step="0.01"
            />
            <mat-error
              *ngIf="transactionForm.get('amount')?.hasError('required')"
            >
              Amount is required
            </mat-error>
            <mat-error *ngIf="transactionForm.get('amount')?.hasError('min')">
              Amount must be positive
            </mat-error>
          </mat-form-field>

          <!-- Category -->
          <mat-form-field appearance="outline">
            <mat-label>Category</mat-label>
            <mat-select formControlName="category" required>
              <mat-option
                *ngFor="let category of categories"
                [value]="category"
              >
                {{ category }}
              </mat-option>
            </mat-select>
            <mat-error
              *ngIf="transactionForm.get('category')?.hasError('required')"
            >
              Category is required
            </mat-error>
          </mat-form-field>

          <!-- Date -->
          <mat-form-field appearance="outline">
            <mat-label>Date</mat-label>
            <input
              matInput
              [matDatepicker]="picker"
              formControlName="date"
              required
            />
            <mat-datepicker-toggle
              matSuffix
              [for]="picker"
            ></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error
              *ngIf="transactionForm.get('date')?.hasError('required')"
            >
              Date is required
            </mat-error>
          </mat-form-field>

          <!-- Notes -->
          <mat-form-field appearance="outline">
            <mat-label>Notes</mat-label>
            <textarea matInput formControlName="notes" rows="3"></textarea>
          </mat-form-field>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button type="button" (click)="dialogRef.close()">
          Cancel
        </button>
        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="transactionForm.invalid"
        >
          {{ data.transaction ? 'Update' : 'Add' }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
})
export class TransactionDialogComponent {
  public transactionForm: FormGroup;
  public readonly categories = TRANSACTION_CATEGORIES;
  public readonly TRANSACTION_TYPES = TRANSACTION_TYPES;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { transaction?: Transaction }
  ) {
    this.transactionForm = this.fb.group({
      type: [data.transaction?.type || 'EXPENSE', Validators.required],
      amount: [
        data.transaction?.amount || '',
        [Validators.required, Validators.min(0)],
      ],
      category: [data.transaction?.category || '', Validators.required],
      date: [data.transaction?.date || new Date(), Validators.required],
      notes: [data.transaction?.notes || ''],
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      this.dialogRef.close(this.transactionForm.value);
    }
  }
}
