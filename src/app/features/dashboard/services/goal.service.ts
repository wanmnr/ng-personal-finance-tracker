/**
 * @file goal.service.ts
 * @description Manages financial goals data and operations
 * @decorator Injectable
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FinancialGoal } from '@dashboard/models/goal.model';

/**
 * Service responsible for managing financial goals
 */
@Injectable({
  providedIn: 'root',
})
export class GoalService {
  /** Mock data for financial goals */
  private mockGoals: FinancialGoal[] = [
    {
      id: '1',
      name: 'Emergency Fund',
      type: 'savings',
      targetAmount: 10000,
      currentAmount: 7500,
      deadline: new Date('2024-12-31'),
      color: '#4CAF50',
      completed: false,
    },
    {
      id: '2',
      name: 'Stock Investment',
      type: 'investment',
      targetAmount: 5000,
      currentAmount: 3000,
      deadline: new Date('2024-06-30'),
      color: '#2196F3',
      completed: false,
    },
    {
      id: '3',
      name: 'Debt Repayment',
      type: 'debt',
      targetAmount: 15000,
      currentAmount: 12000,
      deadline: new Date('2024-09-30'),
      color: '#FF5722',
      completed: false,
    },
  ];

  /**
   * Retrieves all financial goals
   * @returns An Observable of FinancialGoal array
   */
  getFinancialGoals(): Observable<FinancialGoal[]> {
    return of(this.mockGoals);
  }

  /**
   * Updates an existing financial goal
   * @param updatedGoal - The goal with updated information
   * @returns An Observable of the updated FinancialGoal
   */
  updateGoal(updatedGoal: FinancialGoal): Observable<FinancialGoal> {
    const index = this.mockGoals.findIndex(
      (goal) => goal.id === updatedGoal.id
    );
    if (index !== -1) {
      this.mockGoals[index] = updatedGoal;
    }
    return of(updatedGoal);
  }
}
