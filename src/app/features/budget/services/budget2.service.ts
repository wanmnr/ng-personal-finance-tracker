// src/app/features/budget/services/budget2.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Budget, CreateBudgetDto, UpdateBudgetDto } from '../models/budget2.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/budgets`;

  fetchBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.apiUrl).pipe(
      map(budgets => budgets.map(budget => ({
        ...budget,
        createdAt: new Date(budget.createdAt),
        updatedAt: new Date(budget.updatedAt)
      })))
    );
  }

  getBudget(id: string): Observable<Budget> {
    return this.http.get<Budget>(`${this.apiUrl}/${id}`).pipe(
      map(budget => ({
        ...budget,
        createdAt: new Date(budget.createdAt),
        updatedAt: new Date(budget.updatedAt)
      }))
    );
  }

  addBudget(budgetDto: CreateBudgetDto): Observable<Budget> {
    return this.http.post<Budget>(this.apiUrl, budgetDto).pipe(
      map(budget => ({
        ...budget,
        createdAt: new Date(budget.createdAt),
        updatedAt: new Date(budget.updatedAt)
      }))
    );
  }

  updateBudget(budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(`${this.apiUrl}/${budget.id}`, budget).pipe(
      map(budget => ({
        ...budget,
        createdAt: new Date(budget.createdAt),
        updatedAt: new Date(budget.updatedAt)
      }))
    );
  }

  deleteBudget(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
