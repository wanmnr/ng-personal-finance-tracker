// dashboard/budget-dashboard.component.ts

// Budget-Centric Dashboard Approach
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPiggyBank,
  faChartPie,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, BehaviorSubject } from 'rxjs';
import { BudgetService } from '@features/budget/services/budget1.service';
import { BudgetSummary } from '@features/budget/models/budget1.model';

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
        <h1 class="text-2xl font-bold">Budget Overview</h1>
        <p class="text-gray-600">
          Monthly Budget Cycle: {{ currentCycle$ | async | date : 'MMMM yyyy' }}
        </p>
      </header>

      <!-- Budget Summary -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <mat-card class="budget-card">
          <mat-card-content>
            <div class="flex justify-between items-center">
              <div>
                <p class="text-sm text-gray-600">Monthly Budget</p>
                <p class="text-2xl font-bold">
                  {{ (budgetSummary$ | async)?.totalBudget | currency }}
                </p>
              </div>
              <fa-icon [icon]="faPiggyBank" class="text-3xl text-primary-500">
              </fa-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="budget-card">
          <mat-card-content>
            <div class="flex justify-between items-center">
              <div>
                <p class="text-sm text-gray-600">Spent So Far</p>
                <p class="text-2xl font-bold text-red-500">
                  {{ (budgetSummary$ | async)?.totalSpent | currency }}
                </p>
              </div>
              <fa-icon [icon]="faArrowDown" class="text-3xl text-red-500">
              </fa-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="budget-card">
          <mat-card-content>
            <div class="flex justify-between items-center">
              <div>
                <p class="text-sm text-gray-600">Remaining</p>
                <p class="text-2xl font-bold text-green-500">
                  {{ (budgetSummary$ | async)?.remaining | currency }}
                </p>
              </div>
              <fa-icon [icon]="faArrowUp" class="text-3xl text-green-500">
              </fa-icon>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Budget Categories Progress -->
      <div class="grid grid-cols-1 gap-4">
        <mat-card
          *ngFor="let category of budgets$ | async"
          class="category-progress-card"
        >
          <mat-card-content>
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-semibold">{{ category.name }}</h3>
              <div class="text-right">
                <p class="text-sm">
                  {{ category.spent | currency }} /
                  {{ category.allocated | currency }}
                </p>
                <p
                  class="text-xs"
                  [class.text-red-500]="category.percentage > 100"
                  [class.text-green-500]="category.percentage <= 75"
                >
                  {{ category.percentage }}%
                </p>
              </div>
            </div>

            <mat-progress-bar
              [value]="category.percentage"
              [class.warn]="category.percentage > 90"
              [class.accent]="
                category.percentage > 75 && category.percentage <= 90
              "
              [class.primary]="category.percentage <= 75"
            >
            </mat-progress-bar>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .budget-card {
        @apply bg-white dark:bg-gray-700 transition-all duration-300;

        &:hover {
          @apply shadow-lg;
        }
      }

      .category-progress-card {
        @apply bg-white dark:bg-gray-700;

        ::ng-deep {
          .mat-progress-bar {
            @apply rounded-full;
            height: 8px;
          }

          .mat-progress-bar.warn .mat-progress-bar-fill {
            @apply bg-red-500;
          }

          .mat-progress-bar.accent .mat-progress-bar-fill {
            @apply bg-yellow-500;
          }

          .mat-progress-bar.primary .mat-progress-bar-fill {
            @apply bg-green-500;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  currentCycle$ = new BehaviorSubject<Date>(new Date());
  budgetSummary$: Observable<BudgetSummary>;
  budgets$: Observable<any[]>;

  faPiggyBank = faPiggyBank;
  faChartPie = faChartPie;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  constructor(private budgetService: BudgetService) {
    this.budgetSummary$ = this.budgetService.getBudgetSummary();
    this.budgets$ = this.budgetService.getBudgets();
  }

  ngOnInit(): void {
    this.initializeBudgetCycle();
  }

  private initializeBudgetCycle(): void {
    // Initialize current budget cycle
    const today = new Date();
    this.currentCycle$.next(new Date(today.getFullYear(), today.getMonth(), 1));
  }
}
