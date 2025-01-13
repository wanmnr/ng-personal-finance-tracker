// features/report/report.resolver.ts

import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { ReportService } from './report.service';
import { ProgressService } from './progress.service';

// Interfaces
export interface ExpenseBreakdown {
  category: string;
  amount: number;
  date: Date;
  description?: string;
}

export interface CategoryAnalysis {
  category: string;
  total: number;
  percentage: number;
  transactions: number;
}

export interface TrendData {
  date: Date;
  amount: number;
  category: string;
}

export interface ReportSummary {
  totalExpenses: number;
  topCategory: string;
  averagePerDay: number;
  numberOfTransactions: number;
}

export interface ReportProgress {
  stage: 'expenses' | 'categories' | 'trends' | 'processing';
  progress: number;
}

export interface ReportData {
  expenses: ExpenseBreakdown[];
  categories: CategoryAnalysis[];
  trends: TrendData[];
  summary: ReportSummary;
}

// Validation function
function isValidDate(year: number, month: number): boolean {
  if (isNaN(year) || isNaN(month)) return false;
  if (month < 1 || month > 12) return false;
  if (year < 2000 || year > new Date().getFullYear()) return false;
  return true;
}

// Report Resolver
export const reportResolver: ResolveFn<ReportData> = (route) => {
  const reportService = inject(ReportService);
  const progressService = inject(ProgressService);
  const router = inject(Router);

  const year = Number(route.params['year']);
  const month = Number(route.params['month']);

  // Validate date parameters
  if (!isValidDate(year, month)) {
    console.error('Invalid date parameters:', { year, month });
    router.navigate(['/dashboard']);
    return EMPTY;
  }

  progressService.start(); // Initialize progress

  return reportService.generateReport(year, month).pipe(
    tap((progress) => {
      if ('stage' in progress && 'progress' in progress) {
        progressService.updateProgress(progress as ReportProgress);
      }
    }),
    catchError((error) => {
      console.error('Report generation failed:', error);
      progressService.error(error);
      router.navigate(['/dashboard']);
      return EMPTY;
    }),
    finalize(() => {
      progressService.complete();
    })
  );
};
