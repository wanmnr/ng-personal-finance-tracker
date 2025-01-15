// dashboard1.component.ts
// Basic Dashboard with Essential Financial Metrics
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faWallet,
  faChartLine,
  faMoneyBillTrendUp,
  faCircleDollarToSlot
} from '@fortawesome/free-solid-svg-icons';
import { FinancialService } from 'src/app/features/dashboard/services/financial1.service';
import { Observable } from 'rxjs';
import { FinancialMetrics } from './models/financial1.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    FontAwesomeModule
  ],
  template: `
    <div class="dashboard-container p-4 min-h-screen bg-gray-50 dark:bg-gray-800">
      <h1 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white"
          role="heading"
          aria-level="1">
        Financial Dashboard
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Total Balance Card -->
        <mat-card class="dashboard-card">
          <mat-card-content>
            <div class="flex items-center justify-between p-4">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-300">Total Balance</p>
                <h2 class="text-xl font-bold">
                  {{ (metrics$ | async)?.totalBalance | currency }}
                </h2>
              </div>
              <fa-icon
                [icon]="faWallet"
                class="text-2xl text-primary-600"
                aria-hidden="true">
              </fa-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Similar cards for Income, Expenses, and Savings -->
      </div>

      <!-- Additional dashboard content -->
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .dashboard-card {
      @apply bg-white dark:bg-gray-700 rounded-lg shadow-md transition-all duration-300;
      &:hover {
        @apply shadow-lg transform scale-102;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .dashboard-card {
        transition: none;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  metrics$: Observable<FinancialMetrics>;
  faWallet = faWallet;
  faChartLine = faChartLine;
  faMoneyBillTrendUp = faMoneyBillTrendUp;
  faCircleDollarToSlot = faCircleDollarToSlot;

  constructor(private financialService: FinancialService) {
    this.metrics$ = this.financialService.getFinancialMetrics();
  }
  // private readonly transactionService = inject(TransactionService);

  ngOnInit(): void {
    // Initial setup if needed
  }
}
