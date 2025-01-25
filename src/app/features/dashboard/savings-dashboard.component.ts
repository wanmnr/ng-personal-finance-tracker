/**
 * @file savings-dashboard.component.ts
 * @description Savings-Focused Dashboard Approach
 * Dashboard component for displaying savings metrics and goals.
 * Provides a visual interface for users to track their savings progress,
 * including total savings, monthly savings, emergency fund, and investments.
 * Features responsive design and interactive elements for better user experience.
 * @author [Wan]
 * @version 1.0.0
 */

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPiggyBank,
  faMoneyBillWave,
  faSackDollar,
  faCoins,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { SavingsService } from '@dashboard/services/savings.service';
import { SavingsGoal, SavingsMetrics } from '@dashboard/models/savings.model';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    FontAwesomeModule,
  ],
  template: `
    <div class="dashboard-container p-4 min-h-screen">
      <header class="mb-6">
        <h1 class="text-2xl font-bold">Savings Dashboard</h1>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <mat-card
          *ngFor="let saving of savingsMetrics$ | async"
          class="savings-card"
        >
          <mat-card-content>
            <div class="flex items-center justify-between mb-4">
              <fa-icon
                [icon]="getSavingsIcon(saving.type)"
                class="text-3xl"
                [ngStyle]="{ color: saving.color }"
              >
              </fa-icon>
              <div class="text-right">
                <p class="text-sm text-gray-600">{{ saving.label }}</p>
                <p class="text-2xl font-bold">{{ saving.amount | currency }}</p>
              </div>
            </div>

            <div class="relative pt-2">
              <mat-progress-spinner
                [value]="saving.progress"
                [diameter]="60"
                [strokeWidth]="4"
                [color]="saving.progress >= 100 ? 'accent' : 'primary'"
              >
              </mat-progress-spinner>
              <span
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm"
              >
                {{ saving.progress }}%
              </span>
            </div>

            <p class="text-sm mt-4" [ngClass]="getSavingsTrendClass(saving)">
              {{ saving.trend }}% from last month
            </p>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <mat-card class="savings-detail-card">
          <mat-card-header>
            <mat-card-title>Savings Goals Progress</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div
              *ngFor="let goal of savingsGoals$ | async"
              class="goal-item p-4 border-b last:border-b-0"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="font-medium">{{ goal.name }}</span>
                <span>{{ goal.progress }}%</span>
              </div>
              <mat-progress-bar
                [value]="goal.progress"
                [ngClass]="getProgressClass(goal.progress)"
              >
              </mat-progress-bar>
              <div class="flex justify-between text-sm mt-2">
                <span>{{ goal.current | currency }}</span>
                <span>{{ goal.target | currency }}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="savings-detail-card">
          <mat-card-header>
            <mat-card-title>Savings Distribution</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <!-- Insert Chart Component Here -->
            <div class="h-80 w-full">
              <!-- Placeholder for savings distribution chart -->
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .savings-card {
        @apply bg-white dark:bg-gray-700 transition-all duration-300;

        &:hover {
          @apply shadow-lg;
        }
      }

      .savings-detail-card {
        @apply bg-white dark:bg-gray-700;
      }

      .trend-positive {
        @apply text-green-500;
      }

      .trend-negative {
        @apply text-red-500;
      }

      .progress-good {
        ::ng-deep .mat-progress-bar-fill {
          @apply bg-green-500;
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  savingsMetrics$: Observable<SavingsMetrics[]>;
  savingsGoals$: Observable<SavingsGoal[]>;

  constructor(private savingsService: SavingsService) {
    this.savingsMetrics$ = this.savingsService.getSavingsMetrics();
    this.savingsGoals$ = this.savingsService.getSavingsGoals();
  }

  getSavingsIcon(type: string): any {
    const iconMap = {
      total: faPiggyBank,
      monthly: faMoneyBillWave,
      emergency: faSackDollar,
      investments: faCoins,
    };
    return iconMap[type as keyof typeof iconMap] || faPiggyBank;
  }

  getSavingsTrendClass(saving: any): string {
    return saving.trend > 0 ? 'trend-positive' : 'trend-negative';
  }

  getProgressClass(progress: number): string {
    if (progress >= 75) return 'progress-good';
    if (progress >= 50) return 'progress-warning';
    return 'progress-danger';
  }

  ngOnInit(): void {
    // Initialize savings data
  }
}
