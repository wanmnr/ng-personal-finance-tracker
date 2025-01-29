/**
 * @file income.service.ts
 * @description Service for managing and retrieving income-related data
 * @module Services
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Income } from '../models/income.model';
import {
  faBuilding,
  faHandshake,
  faBriefcase,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Provides functionality for managing income data and calculations
 * @class
 * @injectable
 *
 * @example
 * ```typescript
 * export class DashboardComponent {
 *   totalIncome$: Observable<number>;
 *
 *   constructor(private incomeService: IncomeService) {
 *     this.totalIncome$ = this.incomeService.getTotalIncome();
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  /**
   * Mock income data for development purposes
   * @private
   */
  private mockIncome: Income[] = [
    {
      id: '1',
      amount: 5000,
      source: 'Salary',
      date: new Date(),
      status: 'received',
    },
  ];

  /**
   * Retrieves the total sum of all income entries
   * @returns {Observable<number>} Total income amount
   *
   * @example
   * ```typescript
   * this.incomeService.getTotalIncome().subscribe(
   *   total => console.log(`Total income: $${total}`)
   * );
   * ```
   */
  getTotalIncome(): Observable<number> {
    return of(this.mockIncome.reduce((acc, curr) => acc + curr.amount, 0));
  }

  /**
   * Calculates the percentage change in income from the previous period
   * @returns {Observable<number>} Percentage change in income
   *
   * @example
   * ```typescript
   * this.incomeService.getIncomeChange().subscribe(
   *   change => console.log(`Income changed by ${change}%`)
   * );
   * ```
   */
  getIncomeChange(): Observable<number> {
    return of(5.2);
  }

  /**
   * Gets the icon associated with an income source
   * @param {string} source - The income source identifier
   * @returns {IconDefinition} FontAwesome icon definition
   *
   * @example
   * ```typescript
   * const icon = this.incomeService.getSourceIcon('Salary');
   * ```
   */
  getSourceIcon(source: string): IconDefinition {
    const icons: { [key: string]: IconDefinition } = {
      Salary: faBriefcase,
      Freelance: faHandshake,
      Investment: faBuilding,
    };
    return icons[source] || faBriefcase;
  }

  // ... (similar documentation for other methods)
}
