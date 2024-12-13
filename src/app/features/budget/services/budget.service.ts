// src/app/features/budget/budget.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, tap } from 'rxjs';
import { Budget, CreateBudgetDto, UpdateBudgetDto } from '../models/budget.model';
import { environment } from '../../../../environments/environment';
import * as BudgetActions from '../store/budget.actions';

/**
 * Service responsible for handling all budget-related operations
 * @remarks Follows Single Responsibility Principle by focusing only on budget operations
 */
@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private readonly http = inject(HttpClient);
  private readonly store = inject(Store);
  private readonly apiUrl = `${environment.apiUrl}/budgets`;

  /**
   * Fetches all budgets from the backend
   * @returns Observable of Budget array
   * @throws Error if the API request fails
   */
  fetchBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.apiUrl).pipe(
      tap(budgets => this.store.dispatch(BudgetActions.loadBudgetsSuccess({ budgets }))),
      catchError(error => {
        this.store.dispatch(BudgetActions.loadBudgetsFailure({ error }));
        throw error;
      })
    );
  }

  /**
   * Creates a new budget
   * @param budget - The budget data to create
   * @returns Observable of the created Budget
   * @throws Error if the API request fails
   */
  createBudget(budget: CreateBudgetDto): Observable<Budget> {
    return this.http.post<Budget>(this.apiUrl, budget).pipe(
      tap(newBudget => this.store.dispatch(BudgetActions.createBudgetSuccess({ budget: newBudget }))),
      catchError(error => {
        this.store.dispatch(BudgetActions.createBudgetFailure({ error }));
        throw error;
      })
    );
  }

  /**
   * Updates an existing budget
   * @param budgetUpdate - The budget data to update
   * @returns Observable of the updated Budget
   * @throws Error if the API request fails
   */
  updateBudget(budgetUpdate: UpdateBudgetDto): Observable<Budget> {
    return this.http.patch<Budget>(`${this.apiUrl}/${budgetUpdate.id}`, budgetUpdate).pipe(
      tap(updatedBudget => this.store.dispatch(BudgetActions.updateBudgetSuccess({ budget: updatedBudget }))),
      catchError(error => {
        this.store.dispatch(BudgetActions.updateBudgetFailure({ error }));
        throw error;
      })
    );
  }

  /**
   * Deletes a budget by ID
   * @param id - The ID of the budget to delete
   * @returns Observable of void
   * @throws Error if the API request fails
   */
  deleteBudget(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.store.dispatch(BudgetActions.deleteBudgetSuccess({ id }))),
      catchError(error => {
        this.store.dispatch(BudgetActions.deleteBudgetFailure({ error }));
        throw error;
      })
    );
  }

  /**
   * Gets a single budget by ID
   * @param id - The ID of the budget to retrieve
   * @returns Observable of Budget
   * @throws Error if the API request fails
   */
  getBudgetById(id: string): Observable<Budget> {
    return this.http.get<Budget>(`${this.apiUrl}/${id}`).pipe(
      map(budget => ({
        ...budget,
        createdAt: new Date(budget.createdAt),
        updatedAt: new Date(budget.updatedAt)
      })),
      catchError(error => {
        throw error;
      })
    );
  }
}
