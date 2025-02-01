/**
 * @file budget2-edit-dialog.component.ts
 * @description
 * @module BudgetModule
 */

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BudgetDialogData } from './models/budget2.model';

@Component({
  selector: 'app-budget-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  template: `
    <h2 mat-dialog-title>
      {{ dialogData.mode === 'add' ? 'Add New Budget' : 'Edit Budget' }}
    </h2>

    <form [formGroup]="budgetForm" (ngSubmit)="handleSubmit()">
      <mat-dialog-content>
        <div class="flex flex-col gap-4">
          <mat-form-field appearance="outline">
            <mat-label>Category</mat-label>
            <mat-select formControlName="category">
              <mat-option
                *ngFor="let category of budgetCategories"
                [value]="category"
              >
                {{ category }}
              </mat-option>
            </mat-select>
            @if (budgetForm.get('category')?.hasError('required') &&
            budgetForm.get('category')?.touched) {
            <mat-error>Category is required</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Budget Limit</mat-label>
            <input
              matInput
              type="number"
              formControlName="limit"
              placeholder="Enter budget limit"
              min="0"
            />
            @if (budgetForm.get('limit')?.hasError('required') &&
            budgetForm.get('limit')?.touched) {
            <mat-error>Budget limit is required</mat-error>
            } @if (budgetForm.get('limit')?.hasError('min')) {
            <mat-error>Budget limit must be greater than 0</mat-error>
            }
          </mat-form-field>

          @if (dialogData.mode === 'edit') {
          <mat-form-field appearance="outline">
            <mat-label>Spent Amount</mat-label>
            <input
              matInput
              type="number"
              formControlName="spent"
              placeholder="Enter spent amount"
              min="0"
            />
            @if (budgetForm.get('spent')?.hasError('required') &&
            budgetForm.get('spent')?.touched) {
            <mat-error>Spent amount is required</mat-error>
            } @if (budgetForm.get('spent')?.hasError('min')) {
            <mat-error>Spent amount must be greater than 0</mat-error>
            }
          </mat-form-field>
          }
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button type="button" (click)="handleCancel()">
          Cancel
        </button>
        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="budgetForm.invalid"
        >
          {{ dialogData.mode === 'add' ? 'Add' : 'Update' }}
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 24px;
        max-width: 100%;
        width: 400px;
      }

      mat-dialog-content {
        padding-top: 20px;
        padding-bottom: 20px;
      }

      mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class BudgetEditDialogComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _dialogRef = inject(MatDialogRef<BudgetEditDialogComponent>);
  private readonly _dialogData: BudgetDialogData = inject(MAT_DIALOG_DATA);

  // If you want to be more specific about what's exposed:

  // private data: DialogData = inject(MAT_DIALOG_DATA);

  // get mode(): 'add' | 'edit' {
  //   return this.data.mode;
  // }

  // get isEditMode(): boolean {
  //   return this.data.mode === 'edit';
  // }

  // get budget(): Budget | undefined {
  //   return this.data.budget;
  // }

  // Update template to use these getters instead:
  // <h2 mat-dialog-title>{{ mode === 'add' ? 'Add New Budget' : 'Edit Budget' }}</h2>
  // @if (isEditMode) { ... }

  readonly budgetCategories = [
    'Housing',
    'Transportation',
    'Food',
    'Utilities',
    'Healthcare',
    'Entertainment',
    'Shopping',
    'Others',
  ];

  readonly budgetForm: FormGroup = this._formBuilder.group({
    category: ['', Validators.required],
    limit: [0, [Validators.required, Validators.min(0)]],
    spent: [0, [Validators.required, Validators.min(0)]],
  });

  get dialogData(): BudgetDialogData {
    return this._dialogData;
  }

  constructor() {
    if (this.dialogData.mode === 'edit' && this.dialogData.budget) {
      this.budgetForm.patchValue(this.dialogData.budget);
    }
  }

  handleSubmit(): void {
    if (this.budgetForm.valid) {
      const formValue = this.budgetForm.value;
      const result =
        this.dialogData.mode === 'edit' && this.dialogData.budget
          ? { ...this.dialogData.budget, ...formValue }
          : formValue;

      this._dialogRef.close(result);
    }
  }

  handleCancel(): void {
    this._dialogRef.close();
  }
}
