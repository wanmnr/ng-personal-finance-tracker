/**
 * @file savings.service.ts
 * @module Dashboard/Services/Savings
 * @description Core service for managing savings metrics and goals.
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
   * Collection of predefined savings metrics categories
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
   * Collection of financial savings targets with progress tracking
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
   * Retrieves all available savings metrics categories
   * @returns Observable stream of savings metrics
   */
  getSavingsMetrics(): Observable<SavingsMetrics[]> {
    return of(this.mockSavingsMetrics);
  }

  /**
   * Retrieves all user-defined savings goals
   * @returns Observable stream of savings goals
   */
  getSavingsGoals(): Observable<SavingsGoal[]> {
    return of(this.mockSavingsGoals);
  }

  /**
   * Updates properties of an existing savings goal
   * @param goalId - Target goal identifier
   * @param updatedGoal - Goal properties to update
   * @returns Observable of the updated goal
   * @throws Error when goal not found
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
   * Computes progress percentage toward a financial target
   * @param current - Current saved amount
   * @param target - Target amount
   * @returns Capped percentage value (0-100)
   */
  calculateProgress(current: number, target: number): number {
    return Math.min(Math.round((current / target) * 100), 100);
  }
}
