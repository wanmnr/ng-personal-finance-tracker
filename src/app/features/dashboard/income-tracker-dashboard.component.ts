/**
 * @file income-tracker-dashboard.component.ts
 * @description Main dashboard component for income tracking visualization
 * @module Dashboard
 * @decorator Income Tracking Dashboard
 */

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMoneyCheckAlt,
  faChartLine,
  faCalendarAlt,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { IncomeService } from '@dashboard/services/income.service';
import { Income } from '@dashboard/models/income.model';
import { MYRCurrencyPipe } from "../../shared/pipes/myr-currency.pipe";
import { PercentagePipe } from "../../shared/pipes/percentage.pipe";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTabsModule, FontAwesomeModule, MYRCurrencyPipe, PercentagePipe],
  templateUrl: './income-tracker-dashboard.component.html',
  styles: [
    `
      .summary-card {
        @apply bg-white dark:bg-gray-700 transition-all duration-300;

        &:hover {
          @apply shadow-lg;
        }
      }

      .income-list-card {
        @apply bg-white dark:bg-gray-700;
      }

      .income-item {
        @apply hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200;
      }

      .income-increase {
        @apply text-green-500;
      }

      .income-decrease {
        @apply text-red-500;
      }

      .status-received {
        @apply text-green-500;
      }

      .status-pending {
        @apply text-yellow-500;
      }

      .status-delayed {
        @apply text-red-500;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  /**
   * Observable of the total income amount
   * @type {Observable<number>}
   */
  totalIncome$: Observable<number>;

  incomeChange$: Observable<number>;
  averageIncome$: Observable<number>;
  nextPaymentAmount$: Observable<number>;
  daysUntilNextPayment$: Observable<number>;
  recentIncome$: Observable<Income[]>;
  scheduledIncome$: Observable<Income[]>;

  faMoneyCheckAlt = faMoneyCheckAlt;
  faChartLine = faChartLine;
  faCalendarAlt = faCalendarAlt;
  faClock = faClock;

  constructor(private incomeService: IncomeService) {
    this.totalIncome$ = this.incomeService.getTotalIncome();
    this.incomeChange$ = this.incomeService.getIncomeChange();
    this.averageIncome$ = this.incomeService.getAverageIncome();
    this.nextPaymentAmount$ = this.incomeService.getNextPaymentAmount();
    this.daysUntilNextPayment$ = this.incomeService.getDaysUntilNextPayment();
    this.recentIncome$ = this.incomeService.getRecentIncome();
    this.scheduledIncome$ = this.incomeService.getScheduledIncome();
  }

  /**
   * Safely handles null values from async pipe
   * @param change - The change value
   * @returns {number} Safe number value
   */
  getIncomeChangeClass(change: number | null): string {
    return (change || 0) >= 0 ? 'income-increase' : 'income-decrease';
  }

  getIncomeSourceIcon(source: string): any {
    return this.incomeService.getSourceIcon(source);
  }

  getSourceColor(source: string): string {
    return this.incomeService.getSourceColor(source);
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      received: 'status-received',
      pending: 'status-pending',
      delayed: 'status-delayed',
    };
    return statusClasses[status.toLowerCase()] || '';
  }

  /**
   * Safely handles undefined due date
   * @param dueDate - Optional due date
   * @returns {number} Days until due or 0
   */
  getDaysUntilDue(dueDate: Date | undefined): number {
    if (!dueDate) return 0;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = Math.abs(due.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  ngOnInit(): void {
    // Initialize income tracking data
  }
}
