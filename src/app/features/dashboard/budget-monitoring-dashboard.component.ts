// budget-monitoring-dashboard.component.ts
// Budget Monitoring Dashboard

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faWallet,
  faReceipt,
  faArrowDown,
  faArrowUp,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { BudgetService } from '@budget/services/budget1.service';
import { Budget } from '@budget/models/budget1.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    FontAwesomeModule,
  ],
  template: `
    <div class="dashboard-container p-4 min-h-screen">
      <header class="mb-6">
        <h1 class="text-2xl font-bold">Budget Monitor</h1>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <mat-card class="summary-card">
          <mat-card-content>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Total Budget</p>
                <p class="text-2xl font-bold">
                  {{ totalBudget$ | async | currency }}
                </p>
              </div>
              <fa-icon
                [icon]="faWallet"
                class="text-3xl text-blue-500"
              ></fa-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="summary-card">
          <mat-card-content>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Spent</p>
                <p class="text-2xl font-bold">
                  {{ totalSpent$ | async | currency }}
                </p>
              </div>
              <fa-icon
                [icon]="faArrowDown"
                class="text-3xl text-red-500"
              ></fa-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="summary-card">
          <mat-card-content>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">Remaining</p>
                <p class="text-2xl font-bold">
                  {{ remainingBudget$ | async | currency }}
                </p>
              </div>
              <fa-icon
                [icon]="faArrowUp"
                class="text-3xl text-green-500"
              ></fa-icon>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="budget-categories">
        <mat-card
          *ngFor="let budget of budgets$ | async"
          class="category-card mb-4"
        >
          <mat-card-content>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center">
                <fa-icon
                  [icon]="getCategoryIcon(budget.category.name)"
                  class="text-2xl mr-3"
                  [ngStyle]="{ color: budget.category.color }"
                >
                </fa-icon>
                <div>
                  <h3 class="font-semibold">{{ budget.name }}</h3>
                  <p class="text-sm text-gray-600">
                    {{ budget.spent | currency }} of
                    {{ budget.allocated | currency }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm" [ngClass]="getStatusClass(budget)">
                  {{ getRemainingBudget(budget) | currency }} remaining
                </p>
                <p class="text-xs text-gray-500">
                  {{ getDaysRemaining() }} days left
                </p>
              </div>
            </div>

            <div class="relative">
              <mat-progress-bar
                [value]="calculateProgress(budget)"
                [ngClass]="getProgressBarClass(budget)"
              >
              </mat-progress-bar>

              <div
                *ngIf="isOverBudget(budget)"
                class="flex items-center mt-2 text-red-500"
              >
                <fa-icon [icon]="faExclamationTriangle" class="mr-2"></fa-icon>
                <span class="text-sm"
                  >Over budget by
                  {{ getOverBudgetAmount(budget) | currency }}
                </span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .summary-card {
        @apply bg-white dark:bg-gray-700 transition-all duration-300;

        &:hover {
          @apply shadow-lg;
        }
      }

      .category-card {
        @apply bg-white dark:bg-gray-700 transition-all duration-300;

        &:hover {
          @apply shadow-md;
        }
      }

      .progress-normal {
        ::ng-deep .mat-progress-bar-fill {
          @apply bg-blue-500;
        }
      }

      .progress-warning {
        ::ng-deep .mat-progress-bar-fill {
          @apply bg-yellow-500;
        }
      }

      .progress-danger {
        ::ng-deep .mat-progress-bar-fill {
          @apply bg-red-500;
        }
      }

      .status-good {
        @apply text-green-500;
      }

      .status-warning {
        @apply text-yellow-500;
      }

      .status-danger {
        @apply text-red-500;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  totalBudget$: Observable<number>;
  totalSpent$: Observable<number>;
  remainingBudget$: Observable<number>;
  budgets$: Observable<Budget[]>;

  faWallet = faWallet;
  faReceipt = faReceipt;
  faArrowDown = faArrowDown;
  faArrowUp = faArrowUp;
  faExclamationTriangle = faExclamationTriangle;

  constructor(private budgetService: BudgetService) {
    this.totalBudget$ = this.budgetService.getTotalBudget();
    this.totalSpent$ = this.budgetService.getTotalSpent();
    this.remainingBudget$ = this.budgetService.getRemainingBudget();
    this.budgets$ = this.budgetService.getBudgets();
  }

  getCategoryIcon(type: string): any {
    return this.budgetService.getCategoryIcon(type);
  }

  calculateProgress(budget: Budget): number {
    return (budget.spent / budget.allocated) * 100;
  }

  getProgressBarClass(budget: Budget): string {
    const progress = this.calculateProgress(budget);
    if (progress >= 90) return 'progress-danger';
    if (progress >= 75) return 'progress-warning';
    return 'progress-normal';
  }

  getStatusClass(budget: Budget): string {
    const progress = this.calculateProgress(budget);
    if (progress >= 90) return 'status-danger';
    if (progress >= 75) return 'status-warning';
    return 'status-good';
  }

  getRemainingBudget(budget: Budget): number {
    return Math.max(0, budget.allocated - budget.spent);
  }

  isOverBudget(budget: Budget): boolean {
    return budget.spent > budget.allocated;
  }

  getOverBudgetAmount(budget: Budget): number {
    return Math.max(0, budget.spent - budget.allocated);
  }

  getDaysRemaining(): number {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return lastDay.getDate() - today.getDate();
  }

  ngOnInit(): void {
    // Initialize budget monitoring data
  }
}
