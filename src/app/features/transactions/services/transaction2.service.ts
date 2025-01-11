// services/transaction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, TransactionFilters } from '../models/transaction2.model';
import { environment } from '@env/environment';

/**
 * Service handling transaction-related API calls
 * @class TransactionService
 */
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) {}

  /**
   * Fetches transactions based on filters
   * @param filters - Optional transaction filters
   * @returns Observable of Transaction array
   */
  getTransactions(filters?: TransactionFilters): Observable<Transaction[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.dateRange) {
        params = params.set('startDate', filters.dateRange.start.toISOString());
        params = params.set('endDate', filters.dateRange.end.toISOString());
      }
      if (filters.category) {
        params = params.set('category', filters.category);
      }
      if (filters.type) {
        params = params.set('type', filters.type);
      }
      if (filters.minAmount !== undefined) {
        params = params.set('minAmount', filters.minAmount.toString());
      }
      if (filters.maxAmount !== undefined) {
        params = params.set('maxAmount', filters.maxAmount.toString());
      }
    }

    return this.http.get<Transaction[]>(this.apiUrl, { params });
  }

  /**
   * Creates a new transaction
   * @param transaction - Transaction data to create
   * @returns Observable of created Transaction
   */
  createTransaction(
    transaction: Omit<Transaction, 'id'>
  ): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  /**
   * Updates an existing transaction
   * @param id - Transaction ID
   * @param transaction - Updated transaction data
   * @returns Observable of updated Transaction
   */
  updateTransaction(
    id: string,
    transaction: Partial<Transaction>
  ): Observable<Transaction> {
    return this.http.patch<Transaction>(`${this.apiUrl}/${id}`, transaction);
  }

  /**
   * Deletes a transaction
   * @param id - Transaction ID to delete
   * @returns Observable of void
   */
  deleteTransaction(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
