// services/financial2.service.ts

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  FinancialMetrics,
  TransactionSummary,
  DashboardPreferences,
} from '@features/dashboard/models/financial2.model';

@Injectable({
  providedIn: 'root',
})
export class FinancialService {
  private preferencesSubject = new BehaviorSubject<DashboardPreferences>({
    layoutType: 'comfortable',
    visibleMetrics: ['balance', 'income', 'expenses'],
    defaultTimeframe: 'monthly',
    refreshInterval: 30000,
  });

  getFinancialMetrics(): Observable<FinancialMetrics> {
    return of({
      totalBalance: 10000,
      previousBalance: 9000,
      totalIncome: 5000,
      totalExpenses: 3000,
      savingsRate: 0.2,
      monthlyChange: 0.1,
    });
  }

  getTransactionSummary(): Observable<TransactionSummary> {
    return of({
      recent: [],
      categoryBreakdown: [],
      dailyTotals: [],
    });
  }

  getDashboardPreferences(): Observable<DashboardPreferences> {
    return this.preferencesSubject.asObservable();
  }

  refreshData(): Observable<boolean> {
    return of(true).pipe(delay(1000));
  }

  getRealtimeUpdates(): Observable<void> {
    return new Observable((subscriber) => {
      const interval = setInterval(() => {
        subscriber.next();
      }, 30000);

      return () => clearInterval(interval);
    });
  }
}
