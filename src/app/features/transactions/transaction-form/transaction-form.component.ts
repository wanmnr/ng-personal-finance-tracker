// transactions/transaction-form/transaction-form.component.ts

import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Transaction, TransactionFormData } from '@features/transactions/types/transaction.types';

/**
 * Component for creating and editing transactions
 */
@Component({
  selector: 'app-transaction-form',
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
    FontAwesomeModule
  ],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6">
          {{ transaction ? 'Edit' : 'Add' }} Transaction
        </h2>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- Amount Field -->
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Amount</mat-label>
            <input
              matInput
              type="number"
              formControlName="amount"
              placeholder="Enter amount"
              required
            >
            @if (form.get('amount')?.hasError('required') && form.get('amount')?.touched) {
              <mat-error>Amount is required</mat-error>
            }
          </mat-form-field>

          <!-- Category Field -->
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Category</mat-label>
            <mat-select formControlName="categoryId" required>
              @for (category of categories(); track category.id) {
                <mat-option [value]="category.id">
                  <div class="flex items-center gap-2">
                    <fa-icon [icon]="category.icon"></fa-icon>
                    {{ category.name }}
                  </div>
                </mat-option>
              }
            </mat-select>
            @if (form.get('categoryId')?.hasError('required') && form.get('categoryId')?.touched) {
              <mat-error>Category is required</mat-error>
            }
          </mat-form-field>

          <!-- Date Field -->
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Date</mat-label>
            <input
              matInput
              [matDatepicker]="picker"
              formControlName="date"
              required
            >
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            @if (form.get('date')?.hasError('required') && form.get('date')?.touched) {
              <mat-error>Date is required</mat-error>
            }
          </mat-form-field>

          <!-- Notes Field -->
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Notes</mat-label>
            <textarea
              matInput
              formControlName="notes"
              placeholder="Add notes (optional)"
              rows="3"
            ></textarea>
          </mat-form-field>

          <!-- Form Actions -->
          <div class="flex justify-end gap-3">
            <button
              type="button"
              mat-button
              (click)="onCancel()"
            >
              Cancel
            </button>
            <button
              type="submit"
              mat-raised-button
              color="primary"
              [disabled]="form.invalid || form.pristine"
            >
              {{ transaction ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class TransactionFormComponent {
  private readonly fb = inject(FormBuilder);

  @Input() transaction: Transaction | null = null;
  @Output() save = new EventEmitter<TransactionFormData>();
  @Output() cancel = new EventEmitter<void>();

  // Mock categories - in real app, this would come from a service/store
  readonly categories = signal([
    { id: '1', name: 'Groceries', icon: 'shopping-cart', type: 'expense' },
    { id: '2', name: 'Rent', icon: 'home', type: 'expense' },
    { id: '3', name: 'Salary', icon: 'money-bill', type: 'income' },
    // ... more categories
  ]);

  form: FormGroup = this.fb.group({
    amount: ['', [Validators.required, Validators.min(0)]],
    categoryId: ['', Validators.required],
    date: [new Date(), Validators.required],
    notes: ['']
  });

  constructor() {
    if (this.transaction) {
      this.form.patchValue({
        amount: Math.abs(this.transaction.amount),
        categoryId: this.transaction.category.id,
        date: this.transaction.date,
        notes: this.transaction.notes
      });
    }
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    if (this.form.valid) {
      const formData: TransactionFormData = {
        amount: this.form.value.amount,
        categoryId: this.form.value.categoryId,
        date: this.form.value.date,
        notes: this.form.value.notes
      };
      this.save.emit(formData);
    }
  }

  /**
   * Handles form cancellation
   */
  onCancel(): void {
    this.cancel.emit();
  }
}
