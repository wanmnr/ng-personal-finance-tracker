// components/transaction2-filters/transaction-filters.component.ts

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import {
  TransactionFilters,
  TransactionType,
} from '@features/transactions/models/transaction2.model';
import {
  TRANSACTION_CATEGORIES,
  TRANSACTION_TYPES,
} from '@features/transactions/models/transaction2.constant';

/**
 * Presentational component for transaction filtering
 * @class TransactionFiltersComponent
 */
@Component({
  selector: 'app-transaction-filters',
  templateUrl: './transaction2-filters.component.html',
  styles: [
    `
      /* transaction-filters.component.scss */
      :host {
        display: block;
      }

      .mat-form-field {
        width: 100%;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFiltersComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<TransactionFilters>();

  public filterForm: FormGroup;
  public readonly categories = TRANSACTION_CATEGORIES;
  public readonly TRANSACTION_TYPES = TRANSACTION_TYPES;

  constructor(private readonly fb: FormBuilder) {
    this.filterForm = this.fb.group({
      startDate: [null],
      endDate: [null],
      category: [''],
      type: [''],
      minAmount: [null],
      maxAmount: [null],
    });
  }

  ngOnInit(): void {
    this.setupFilterSubscription();
  }

  private setupFilterSubscription(): void {
    this.filterForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((filters) => {
        const formattedFilters = this.formatFilters(filters);
        this.filtersChanged.emit(formattedFilters);
      });
  }

  private formatFilters(filters: any): TransactionFilters {
    return {
      dateRange: this.formatDateRange(filters),
      category: filters.category || undefined,
      type: (filters.type as TransactionType) || undefined,
      minAmount: filters.minAmount || undefined,
      maxAmount: filters.maxAmount || undefined,
    };
  }

  private formatDateRange(
    filters: any
  ): { start: Date; end: Date } | undefined {
    return filters.startDate && filters.endDate
      ? { start: filters.startDate, end: filters.endDate }
      : undefined;
  }
}
