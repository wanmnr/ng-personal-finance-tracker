/**
 * @file financial1.service.ts
 * @description Service for handling expense analytics data operations
 * @module Services
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, Observable, of, throwError, timeout } from 'rxjs';
import { environment } from '@env/environment';
import {
  Transaction,
  Budget,
  FinancialMetrics,
  MonthlyReport,
} from '../models/financial1.model';
import {
  mockFinancialMetrics,
  mockTransactions,
  mockBudgets,
  mockMonthlyReport,
} from '../mocks/financial1.mock';

@Injectable({
  providedIn: 'root',
})
export class FinancialService {
  private apiUrl = environment.apiUrl + '/financial';
  private timeoutDuration = 5000;
  private useMockData = environment.useMockData;

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', mockData: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.warn(`${operation} failed: ${error.message}`);

      if (this.useMockData) {
        console.info(`Using mock data for ${operation}`);
        return of(mockData).pipe(delay(300)); // Simulate network delay
      }

      return throwError(() => error);
    };
  }

  // FinancialMetric Methods
  getFinancialMetrics(): Observable<FinancialMetrics> {
    return this.http
      .get<FinancialMetrics>(`${this.apiUrl}/metrics`)
      .pipe(
        timeout(this.timeoutDuration),
        catchError(
          this.handleError('getFinancialMetrics', mockFinancialMetrics)
        )
      );
  }

  // Transaction Methods
  getTransactions(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(`${this.apiUrl}/transactions`)
      .pipe(
        timeout(this.timeoutDuration),
        catchError(this.handleError('getTransactions', mockTransactions))
      );
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http
      .post<Transaction>(`${this.apiUrl}/transactions`, transaction)
      .pipe(
        timeout(this.timeoutDuration),
        catchError(this.handleError('addTransaction', transaction))
      );
  }

  // Budget Methods
  getBudgets(): Observable<Budget[]> {
    return this.http
      .get<Budget[]>(`${this.apiUrl}/budgets`)
      .pipe(
        timeout(this.timeoutDuration),
        catchError(this.handleError('getBudgets', mockBudgets))
      );
  }

  updateBudget(budget: Budget): Observable<Budget> {
    return this.http
      .put<Budget>(`${this.apiUrl}/budgets/${budget.id}`, budget)
      .pipe(
        timeout(this.timeoutDuration),
        catchError(this.handleError('updateBudget', budget))
      );
  }

  // Analytics Methods
  getMonthlyReport(month: number, year: number): Observable<MonthlyReport> {
    return this.http
      .get<MonthlyReport>(`${this.apiUrl}/reports/monthly`, {
        params: { month: month.toString(), year: year.toString() },
      })
      .pipe(
        timeout(this.timeoutDuration),
        catchError(this.handleError('getMonthlyReport', mockMonthlyReport))
      );
  }

  // // CRUD operations for transactions
  // addTransaction() { }
  // getTransactions() { }
  // updateTransaction() { }
  // deleteTransaction() { }

  // // Budget operations
  // calculateBudget() { }
  // setBudgetLimits() { }

  // // Analytics functions
  // generateReport() { }
  // calculateExpensesByCategory() { }
}
