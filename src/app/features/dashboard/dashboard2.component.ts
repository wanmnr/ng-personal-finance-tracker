// dashboard2.component.ts
// Advanced Dashboard with Interactive Features and Real-time Updates
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject, Observable, combineLatest, of } from 'rxjs';
import { takeUntil, map, share } from 'rxjs/operators';
import {
  faWallet,
  faChartPie,
  faGear,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { FinancialService } from './services/financial2.service';
import { ThemeService } from './services/theme2.service';
import {
  DashboardMetric,
  FinancialMetrics,
  TransactionSummary,
  DashboardPreferences,
} from './types/finance2.types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    FontAwesomeModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line for fa-icon
  template: `
    <div
      class="dashboard-container p-4 min-h-screen"
      [class.dark]="isDarkMode$ | async"
      role="main"
    >
      <!-- Header Section -->
      <header class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          Financial Dashboard
        </h1>

        <div class="flex gap-2">
          <button
            mat-icon-button
            [matMenuTriggerFor]="menu"
            aria-label="Dashboard settings"
          >
            <fa-icon [icon]="faGear"></fa-icon>
          </button>

          <button
            mat-icon-button
            (click)="refreshDashboard()"
            aria-label="Refresh dashboard"
          >
            <fa-icon [icon]="faRefresh" [class.fa-spin]="isLoading"> </fa-icon>
          </button>
        </div>
      </header>

      <!-- Dynamic Grid Layout -->
      <div class="grid-layout" [class]="gridLayoutClass$ | async">
        <!-- Financial Cards -->
        <ng-container *ngFor="let metric of dashboardMetrics$ | async">
          <mat-card
            class="dashboard-card"
            [attr.data-metric]="metric.type"
            [class.highlight]="metric.isHighlighted"
          >
            <mat-card-content>
              <div class="flex items-center justify-between p-4">
                <div>
                  <p
                    class="text-sm text-gray-600 dark:text-gray-300"
                    [attr.aria-label]="metric.label"
                  >
                    {{ metric.label }}
                  </p>
                  <h2 class="text-xl font-bold">
                    {{ metric.value | currency }}
                  </h2>
                  <p
                    class="text-xs"
                    [class.text-green-500]="metric.trend > 0"
                    [class.text-red-500]="metric.trend < 0"
                  >
                    {{ metric.trend }}% from last month
                  </p>
                </div>
                <fa-icon
                  [icon]="metric.icon"
                  class="text-2xl"
                  [class.text-primary-600]="!metric.isNegative"
                  [class.text-red-500]="metric.isNegative"
                  aria-hidden="true"
                >
                </fa-icon>
              </div>
            </mat-card-content>
          </mat-card>
        </ng-container>
      </div>

      <!-- Settings Menu -->
      <mat-menu #menu="matMenu">
        <button mat-menu-item (click)="toggleDarkMode()">
          Toggle Dark Mode
        </button>
        <button mat-menu-item (click)="customizeLayout()">
          Customize Layout
        </button>
      </mat-menu>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .dashboard-container {
        @apply transition-colors duration-300;
      }

      .grid-layout {
        @apply grid gap-4;

        &.compact {
          @apply grid-cols-2 md:grid-cols-4;
        }

        &.comfortable {
          @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
        }
      }

      .dashboard-card {
        @apply bg-white dark:bg-gray-700 rounded-lg shadow-md
             transition-all duration-300;

        &:hover {
          @apply shadow-lg transform scale-102;
        }

        &.highlight {
          @apply ring-2 ring-primary-500;
        }
      }

      &:hover {
        @apply shadow-lg transform scale-105; // Change scale-102 to scale-105
      }

      // Accessibility: Respect user's motion preferences
      @media (prefers-reduced-motion: reduce) {
        .dashboard-card,
        .dashboard-container {
          @apply transition-none transform-none;
        }
      }

      // High Contrast Mode Support
      @media (forced-colors: active) {
        .dashboard-card {
          border: 1px solid CanvasText;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Initialize observables with default values
  isDarkMode$: Observable<boolean> = of(false);
  dashboardMetrics$: Observable<Array<DashboardMetric>> = of([]);
  gridLayoutClass$: Observable<string> = of('comfortable');
  isLoading = false;

  // Font Awesome Icons
  faWallet = faWallet;
  faChartPie = faChartPie;
  faGear = faGear;
  faRefresh = faRefresh;

  constructor(
    private financialService: FinancialService,
    private themeService: ThemeService,
    private dialog: MatDialog
  ) {
    this.initializeObservables();
  }

  private initializeObservables(): void {
    this.isDarkMode$ = this.themeService.isDarkMode$;

    this.gridLayoutClass$ = this.financialService
      .getDashboardPreferences()
      .pipe(
        map((prefs: DashboardPreferences) =>
          prefs.layoutType === 'compact' ? 'compact' : 'comfortable'
        )
      );

    this.dashboardMetrics$ = combineLatest([
      this.financialService.getFinancialMetrics(),
      this.financialService.getTransactionSummary(),
    ]).pipe(
      map(([metrics, transactions]) =>
        this.transformMetrics(metrics, transactions)
      ),
      share()
    );
  }

  private transformMetrics(
    metrics: FinancialMetrics,
    transactions: TransactionSummary
  ): Array<DashboardMetric> {
    // Transform raw data into display metrics
    return [
      {
        type: 'balance',
        label: 'Total Balance',
        value: metrics.totalBalance,
        trend: this.calculateTrend(
          metrics.previousBalance,
          metrics.totalBalance
        ),
        icon: this.faWallet,
        isHighlighted: false,
        isNegative: metrics.totalBalance < 0,
      },
      // Additional metrics transformation...
    ];
  }

  private calculateTrend(previous: number, current: number): number {
    return previous === 0
      ? 0
      : Number((((current - previous) / previous) * 100).toFixed(1));
  }

  async refreshDashboard(): Promise<void> {
    this.isLoading = true;
    try {
      await this.financialService.refreshData().toPromise();
    } finally {
      this.isLoading = false;
    }
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }

  customizeLayout(): void {
    // Implement layout customization dialog
  }

  ngOnInit(): void {
    // Initialize real-time updates or additional setup
    this.setupRealtimeUpdates();
  }

  private setupRealtimeUpdates(): void {
    this.financialService
      .getRealtimeUpdates()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.refreshDashboard());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
