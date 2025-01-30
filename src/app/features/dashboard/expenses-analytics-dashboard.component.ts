// expenses-analytics-dashboard.component.ts
// Expense Analytics Dashboard Approach

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChartBar,
  faChartPie,
  faChartLine,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AnalyticsService } from '@dashboard/services/analytics.service';
import { ExpenseAnalytics } from '@dashboard/models/analytics.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonToggleModule,
    FontAwesomeModule,
    FormsModule,
  ],
  template: `
    <div class="dashboard-container p-4 min-h-screen">
      <header class="mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Expense Analytics</h1>
        <mat-button-toggle-group
          [(ngModel)]="selectedPeriod"
          (change)="updatePeriod()"
        >
          <mat-button-toggle value="week">Week</mat-button-toggle>
          <mat-button-toggle value="month">Month</mat-button-toggle>
          <mat-button-toggle value="year">Year</mat-button-toggle>
        </mat-button-toggle-group>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <mat-card *ngFor="let metric of metrics$ | async" class="metric-card">
          <mat-card-content>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600">{{ metric.label }}</p>
                <p class="text-2xl font-bold">{{ metric.value | currency }}</p>
              </div>
              <fa-icon
                [icon]="getMetricIcon(metric.type)"
                class="text-3xl"
                [ngStyle]="{ color: metric.color }"
              >
              </fa-icon>
            </div>
            <p class="text-sm mt-2" [ngClass]="getMetricTrendClass(metric)">
              {{ metric.trend }}%
              {{ metric.trend > 0 ? 'increase' : 'decrease' }}
            </p>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Expense Trends</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <!-- Insert Chart Component Here -->
            <div class="h-80 w-full">
              <!-- Placeholder for expense trend chart -->
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="chart-card">
          <mat-card-header>
            <mat-card-title>Category Distribution</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <!-- Insert Chart Component Here -->
            <div class="h-80 w-full">
              <!-- Placeholder for category distribution chart -->
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .metric-card {
        @apply bg-white dark:bg-gray-700 transition-all duration-300;

        &:hover {
          @apply shadow-lg;
        }
      }

      .chart-card {
        @apply bg-white dark:bg-gray-700;
      }

      .trend-up {
        @apply text-red-500;
      }

      .trend-down {
        @apply text-green-500;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  selectedPeriod = 'month';
  metrics$: Observable<any[]>;

  constructor(private analyticsService: AnalyticsService) {
    this.metrics$ = this.analyticsService.getMetrics(this.selectedPeriod);
  }

  getMetricIcon(type: string): any {
    const iconMap = {
      total: faChartBar,
      average: faChartLine,
      breakdown: faChartPie,
      period: faCalendar,
    };
    return iconMap[type as keyof typeof iconMap] || faChartBar;
  }

  getMetricTrendClass(metric: any): string {
    return metric.trend > 0 ? 'trend-up' : 'trend-down';
  }

  updatePeriod(): void {
    this.metrics$ = this.analyticsService.getMetrics(this.selectedPeriod);
  }

  ngOnInit(): void {
    // Initialize analytics data
  }
}
