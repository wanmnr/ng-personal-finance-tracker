/**
 * @file budget1.service.ts
 * @description
 * @module BudgetModule
 * @decorator Injectable
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of, tap } from 'rxjs';
import {
  Budget,
  BudgetSummary,
  CreateBudgetDto,
  UpdateBudgetDto,
} from '../models/budget1.model';
import { environment } from '../../../../environments/environment';
import * as BudgetActions from '../store/budget.actions';

/**
 * Service responsible for handling all budget-related operations
 * @remarks Follows Single Responsibility Principle by focusing only on budget operations
 */
@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private readonly http = inject(HttpClient);
  private readonly store = inject(Store);
  private readonly apiUrl = `${environment.apiUrl}/budgets`;

  // Sample data for demonstration
  private sampleBudgets: Budget[] = [
    {
      id: '1',
      name: 'Monthly Rent & Maintenance',
      category: {
        id: 'cat1',
        name: 'Housing',
        color: '#FF9800',
        icon: 'home',
        description: 'Housing and maintenance expenses',
      },
      allocated: 2000,
      spent: 1800,
      percentage: 90,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-24'),
    },
    {
      id: '2',
      name: 'Groceries & Dining',
      category: {
        id: 'cat2',
        name: 'Food',
        color: '#4CAF50',
        icon: 'utensils',
        description: 'Food and dining expenses',
      },
      allocated: 800,
      spent: 600,
      percentage: 75,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-24'),
    },
    {
      id: '3',
      name: 'Gas & Public Transit',
      category: {
        id: 'cat3',
        name: 'Transportation',
        color: '#2196F3',
        icon: 'car',
        description: 'Transportation expenses',
      },
      allocated: 400,
      spent: 250,
      percentage: 62.5,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-24'),
    },
    {
      id: '4',
      name: 'Movies & Recreation',
      category: {
        id: 'cat4',
        name: 'Entertainment',
        color: '#9C27B0',
        icon: 'film',
        description: 'Entertainment and recreation expenses',
      },
      allocated: 300,
      spent: 275,
      percentage: 91.67,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-24'),
    },
    {
      id: '5',
      name: 'Electricity & Water',
      category: {
        id: 'cat5',
        name: 'Utilities',
        color: '#F44336',
        icon: 'bolt',
        description: 'Utility expenses',
      },
      allocated: 500,
      spent: 325,
      percentage: 65,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-24'),
    },
  ];

  private sampleBudgetSummary: BudgetSummary = {
    totalBudget: 5000,
    totalSpent: 3250,
    remainingBudget: 1750,
  };

  getBudgets(): Observable<Budget[]> {
    return of(this.sampleBudgets);
  }

  getBudgetSummary(): Observable<BudgetSummary> {
    return of(this.sampleBudgetSummary);
  }

  getTotalBudget(): Observable<number> {
    // Implement the logic to get total budget
    return new Observable<number>();
  }

  getTotalSpent(): Observable<number> {
    // Implement the logic to get total spent
    return new Observable<number>();
  }

  getRemainingBudget(): Observable<number> {
    // Implement the logic to get remaining budget
    return new Observable<number>();
  }

  getCategoryIcon(categoryName: string): any {
    // Implement the logic to return the appropriate icon based on category name
    // You can use a switch statement or a mapping object
    return null;
  }

  /**
   * Fetches all budgets from the backend
   * @returns Observable of Budget array
   * @throws Error if the API request fails
   */
  fetchBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.apiUrl).pipe(
      tap((budgets) =>
        this.store.dispatch(BudgetActions.loadBudgetsSuccess({ budgets }))
      ),
      catchError((error) => {
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
      tap((newBudget) =>
        this.store.dispatch(
          BudgetActions.createBudgetSuccess({ budget: newBudget })
        )
      ),
      catchError((error) => {
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
    return this.http
      .patch<Budget>(`${this.apiUrl}/${budgetUpdate.id}`, budgetUpdate)
      .pipe(
        tap((updatedBudget) =>
          this.store.dispatch(
            BudgetActions.updateBudgetSuccess({ budget: updatedBudget })
          )
        ),
        catchError((error) => {
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
      catchError((error) => {
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
      map((budget) => ({
        ...budget,
        createdAt: new Date(budget.createdAt),
        updatedAt: new Date(budget.updatedAt),
      })),
      catchError((error) => {
        throw error;
      })
    );
  }
}
