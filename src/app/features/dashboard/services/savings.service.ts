/**
 * @file savings.service.ts
 * @description Service responsible for managing all savings-related operations.
 * Provides methods for retrieving and updating savings metrics and goals.
 * Currently implements mock data, but designed to be easily replaced with
 * real API calls in production.
 * @author [Wan]
 * @version 1.0.0
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SavingsMetrics, SavingsGoal } from '@dashboard/models/savings.model';

/**
 * Service responsible for managing savings-related operations
 */
@Injectable({
  providedIn: 'root',
})
export class SavingsService {
  /**
   * Mock data for savings metrics
   * @private
   */
  private readonly mockSavingsMetrics: SavingsMetrics[] = [
    {
      type: 'total',
      label: 'Total Savings',
      amount: 25000,
      progress: 83,
      color: '#4CAF50',
      trend: 12,
    },
    {
      type: 'monthly',
      label: 'Monthly Savings',
      amount: 2000,
      progress: 90,
      color: '#2196F3',
      trend: 5,
    },
    {
      type: 'emergency',
      label: 'Emergency Fund',
      amount: 10000,
      progress: 67,
      color: '#FF9800',
      trend: -2,
    },
    {
      type: 'investments',
      label: 'Investments',
      amount: 13000,
      progress: 72,
      color: '#9C27B0',
      trend: 8,
    },
  ];

  /**
   * Mock data for savings goals
   * @private
   */
  private readonly mockSavingsGoals: SavingsGoal[] = [
    {
      id: '1',
      name: 'Home Down Payment',
      current: 15000,
      target: 50000,
      progress: 30,
      targetDate: new Date('2024-12-31'),
    },
    {
      id: '2',
      name: 'Emergency Fund',
      current: 10000,
      target: 15000,
      progress: 67,
      targetDate: new Date('2024-06-30'),
    },
    {
      id: '3',
      name: 'Vacation Fund',
      current: 3000,
      target: 5000,
      progress: 60,
      targetDate: new Date('2024-08-31'),
    },
  ];

  constructor() {}

  /**
   * Retrieves savings metrics data
   * @returns An Observable of SavingsMetrics array
   */
  getSavingsMetrics(): Observable<SavingsMetrics[]> {
    return of(this.mockSavingsMetrics);
  }

  /**
   * Retrieves savings goals data
   * @returns An Observable of SavingsGoal array
   */
  getSavingsGoals(): Observable<SavingsGoal[]> {
    return of(this.mockSavingsGoals);
  }

  /**
   * Updates a savings goal
   * @param goalId - The ID of the goal to update
   * @param updatedGoal - The updated goal data
   * @returns An Observable of the updated SavingsGoal
   * @throws Error if goal is not found
   */
  updateSavingsGoal(
    goalId: string,
    updatedGoal: Partial<SavingsGoal>
  ): Observable<SavingsGoal> {
    const goal = this.mockSavingsGoals.find((g) => g.id === goalId);
    if (!goal) {
      throw new Error('Goal not found');
    }

    const updated = { ...goal, ...updatedGoal };
    return of(updated);
  }

  /**
   * Calculates the progress percentage for a savings goal
   * @param current - Current amount saved
   * @param target - Target amount
   * @returns Progress percentage (capped at 100)
   */
  calculateProgress(current: number, target: number): number {
    return Math.min(Math.round((current / target) * 100), 100);
  }
}
