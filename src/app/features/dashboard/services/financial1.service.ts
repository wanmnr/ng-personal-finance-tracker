// src/app/features/dashboard/financial1.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, Budget, FinancialMetrics, MonthlyReport } from '../models/financial1.model';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  private apiUrl = 'api/financial'; // Your API endpoint

  constructor(private http: HttpClient) { }

  // FinancialMetric Methods
  getFinancialMetrics(): Observable<FinancialMetrics> {
    return this.http.get<FinancialMetrics>(`${this.apiUrl}/metrics`);
  }

  // Transaction Methods
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transactions`, transaction);
  }

  // Budget Methods
  getBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.apiUrl}/budgets`);
  }

  updateBudget(budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(`${this.apiUrl}/budgets/${budget.id}`, budget);
  }

  // Analytics Methods
  getMonthlyReport(month: number, year: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/monthly`, {
      params: { month: month.toString(), year: year.toString() }
    });
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
