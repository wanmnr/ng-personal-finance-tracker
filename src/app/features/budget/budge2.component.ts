// src/app/features/budget/budget2.component.ts
// Approach 2: Advanced Component with Rich Features

import { Component, OnInit, ChangeDetectionStrategy, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWallet, faChartLine, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { BudgetService } from './services/budget2.service';
import { Budget } from './models/budget2.model';
import { BudgetEditDialogComponent } from './budget2-edit-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    FontAwesomeModule
  ],
  template: `
    <section
      class="budget-dashboard p-4 md:p-6 lg:p-8 min-h-screen"
      role="main"
      aria-labelledby="budget-title">

      <header class="mb-8">
        <h1
          id="budget-title"
          class="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          Budget Dashboard
        </h1>

        <div class="flex flex-wrap gap-4 items-center">
          <div class="stats-card">
            <span class="text-sm text-gray-600 dark:text-gray-400">Total Budget</span>
            <p class="text-xl font-semibold">{{totalBudget() | currency}}</p>
          </div>

          <div class="stats-card">
            <span class="text-sm text-gray-600 dark:text-gray-400">Total Spent</span>
            <p class="text-xl font-semibold">{{totalSpent() | currency}}</p>
          </div>
        </div>
      </header>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        [@listAnimation]="budgets().length">

        <mat-card
          *ngFor="let budget of budgets()"
          class="budget-card"
          [class.over-budget]="isOverBudget(budget)"
          [@cardAnimation]>

          <mat-card-header>
            <div class="flex justify-between items-center w-full">
              <div class="flex items-center">
                <fa-icon
                  [icon]="getBudgetIcon(budget.category)"
                  class="text-primary-600">
                </fa-icon>
                <mat-card-title class="ml-2">{{budget.category}}</mat-card-title>
              </div>

              <div class="flex gap-2">
                <button
                  mat-icon-button
                  (click)="editBudget(budget)"
                  aria-label="Edit budget">
                  <fa-icon [icon]="faEdit"></fa-icon>
                </button>
                <button
                  mat-icon-button
                  (click)="deleteBudget(budget)"
                  aria-label="Delete budget">
                  <fa-icon [icon]="faTrash"></fa-icon>
                </button>
              </div>
            </div>
          </mat-card-header>

          <mat-card-content class="mt-4">
            <div class="budget-details">
              <div class="flex justify-between mb-2">
                <span class="text-lg">
                  {{budget.spent | currency}} / {{budget.limit | currency}}
                </span>
                <span
                  class="percentage-badge"
                  [class.warning]="isNearLimit(budget)"
                  [class.danger]="isOverBudget(budget)">
                  {{getPercentage(budget)}}%
                </span>
              </div>

              <div
                class="progress-container"
                role="progressbar"
                [attr.aria-valuenow]="getPercentage(budget)"
                aria-valuemin="0"
                aria-valuemax="100">
                <div
                  class="progress-bar"
                  [style.width.%]="getPercentage(budget)"
                  [class.warning]="isNearLimit(budget)"
                  [class.danger]="isOverBudget(budget)">
                </div>
              </div>

              <p
                *ngIf="isOverBudget(budget)"
                class="text-red-600 text-sm mt-2"
                role="alert">
                Over budget by {{getOverBudgetAmount(budget) | currency}}
              </p>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <button
        mat-fab
        class="add-budget-btn"
        (click)="addBudget()"
        aria-label="Add new budget">
        <fa-icon [icon]="faPlus"></fa-icon>
      </button>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .budget-dashboard {
      @apply bg-gray-50 dark:bg-gray-900;
    }

    .stats-card {
      @apply bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm;
    }

    .budget-card {
      @apply bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm
             transition-all duration-300 hover:shadow-lg;
    }

    .over-budget {
      @apply border-l-4 border-red-500;
    }

    .progress-container {
      @apply h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden;
    }

    .progress-bar {
      @apply h-full bg-primary-600 rounded-full transition-all duration-300;

      &.warning {
        @apply bg-yellow-500;
      }

      &.danger {
        @apply bg-red-500;
      }
    }

    .percentage-badge {
      @apply px-2 py-1 rounded text-sm font-medium bg-primary-100 text-primary-800;

      &.warning {
        @apply bg-yellow-100 text-yellow-800;
      }

      &.danger {
        @apply bg-red-100 text-red-800;
      }
    }

    .add-budget-btn {
      @apply fixed bottom-6 right-6 bg-primary-600 text-white
             shadow-lg hover:bg-primary-700 transition-colors duration-300;
    }
  `],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in',
          style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('300ms ease-out',
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetComponent implements OnInit {
  private store = inject(Store);
  private budgetService = inject(BudgetService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  // Icons
  faWallet = faWallet;
  faChartLine = faChartLine;
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;

  // Signals
  budgets = signal<Budget[]>([]);

  // Computed values
  totalBudget = computed(() =>
    this.budgets().reduce((sum, budget) => sum + budget.limit, 0)
  );

  totalSpent = computed(() =>
    this.budgets().reduce((sum, budget) => sum + budget.spent, 0)
  );

  constructor() {
    // Setup effects
    effect(() => {
      const total = this.totalSpent();
      if (total > this.totalBudget()) {
        this.showOverBudgetWarning();
      }
    });
  }

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.budgetService.fetchBudgets()
      .pipe(takeUntilDestroyed())
      .subscribe(budgets => this.budgets.set(budgets));
  }

  getPercentage(budget: Budget): number {
    return Math.round((budget.spent / budget.limit) * 100);
  }

  isNearLimit(budget: Budget): boolean {
    const percentage = this.getPercentage(budget);
    return percentage >= 80 && percentage < 100;
  }

  isOverBudget(budget: Budget): boolean {
    return budget.spent > budget.limit;
  }

  getOverBudgetAmount(budget: Budget): number {
    return budget.spent - budget.limit;
  }

  getBudgetIcon(category: string): any {
    // Implementation based on category
    return faWallet;
  }

  addBudget(): void {
    const dialogRef = this.dialog.open(BudgetEditDialogComponent, {
      width: '400px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed())
      .subscribe(result => {
        if (result) {
          this.budgetService.addBudget(result).subscribe(
            budget => {
              this.budgets.update(budgets => [...budgets, budget]);
              this.showSuccessMessage('Budget added successfully');
            }
          );
        }
      });
  }

  editBudget(budget: Budget): void {
    const dialogRef = this.dialog.open(BudgetEditDialogComponent, {
      width: '400px',
      data: { mode: 'edit', budget }
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed())
      .subscribe(result => {
        if (result) {
          this.budgetService.updateBudget(result).subscribe(
            updatedBudget => {
              this.budgets.update(budgets =>
                budgets.map(b => b.id === updatedBudget.id ? updatedBudget : b)
              );
              this.showSuccessMessage('Budget updated successfully');
            }
          );
        }
      });
  }

  deleteBudget(budget: Budget): void {
    if (confirm('Are you sure you want to delete this budget?')) {
      this.budgetService.deleteBudget(budget.id).subscribe(
        () => {
          this.budgets.update(budgets =>
            budgets.filter(b => b.id !== budget.id)
          );
          this.showSuccessMessage('Budget deleted successfully');
        }
      );
    }
  }

  private showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  private showOverBudgetWarning(): void {
    this.snackBar.open('Warning: Total spending exceeds total budget!', 'Close', {
      duration: 5000,
      panelClass: ['warning-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
