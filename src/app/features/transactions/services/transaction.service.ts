// transactions/services/transaction.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Transaction, TransactionFormData } from '@features/transactions/types/transaction.types';
import { environment } from '@env/environment';

/**
 * Service responsible for handling transaction-related API calls
 */
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/transactions`;

  /**
   * Fetches all transactions
   */
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl).pipe(
      map(transactions => transactions.map(transaction => ({
        ...transaction,
        date: new Date(transaction.date),
        createdAt: new Date(transaction.createdAt),
        updatedAt: new Date(transaction.updatedAt)
      }))),
      catchError(this.handleError)
    );
  }

  /**
   * Creates a new transaction
   */
  createTransaction(data: TransactionFormData): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Updates an existing transaction
   */
  updateTransaction(id: string, data: TransactionFormData): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a transaction
   */
  deleteTransaction(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors
   */
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}
