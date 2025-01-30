/**
 * @file analytics.service.ts
 * @description Service for handling expense analytics data operations
 * @module Services
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MetricData, ExpenseAnalytics } from '../models/analytics.model';

/**
 * Service for managing and retrieving expense analytics data
 * @class
 * @injectable
 *
 * @example
 * ```typescript
 * export class DashboardComponent {
 *   constructor(private analyticsService: AnalyticsService) {
 *     this.analyticsService.getMetrics('month')
 *       .subscribe(metrics => {
 *         console.log('Monthly metrics:', metrics);
 *       });
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  /** Mock data store for metrics */
  private mockMetrics: Record<string, MetricData[]> = {
    // ... (mock data remains the same)
  };

  /**
   * Retrieves metrics data for a specified time period
   * @param {string} period - Time period for metrics ('week' | 'month' | 'year')
   * @returns {Observable<MetricData[]>} Stream of metric data
   *
   * @example
   * ```typescript
   * this.analyticsService.getMetrics('month')
   *   .subscribe({
   *     next: (metrics) => console.log('Metrics:', metrics),
   *     error: (error) => console.error('Error fetching metrics:', error)
   *   });
   * ```
   */
  getMetrics(period: string): Observable<MetricData[]> {
    return of(this.mockMetrics[period] || []);
  }
}
