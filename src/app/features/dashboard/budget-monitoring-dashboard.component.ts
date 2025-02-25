/**
 * @file budget-monitoring-dashboard.component.ts
 * @module BudgetMonitoring/Components
 * @description Displays a comprehensive budget monitoring dashboard with summary cards and category-based budget tracking.
 *
 * Budget Monitoring Dashboard
 */

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
  templateUrl: 'budget-monitoring-dashboard.component.html',
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
