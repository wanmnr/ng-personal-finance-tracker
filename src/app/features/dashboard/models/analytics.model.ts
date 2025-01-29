/**
 * @file analytics.model.ts
 * @description Type definitions for expense analytics data structures
 * @module Models
 */

/**
 * Represents a single metric data point in the analytics dashboard
 * @interface
 *
 * @example
 * ```typescript
 * const metric: MetricData = {
 *   label: 'Total Expenses',
 *   value: 1000.50,
 *   type: 'total',
 *   trend: 5.5,
 *   color: '#FF6B6B'
 * };
 * ```
 */
export interface MetricData {
  /** Display label for the metric */
  label: string;
  /** Numeric value of the metric */
  value: number;
  /** Type of metric for icon display */
  type: 'total' | 'average' | 'breakdown' | 'period';
  /** Percentage trend compared to previous period */
  trend: number;
  /** Color code for visual representation */
  color: string;
}

/**
 * Complete analytics data structure
 * @interface
 */
export interface ExpenseAnalytics {
  /** Array of metric data points */
  metrics: MetricData[];
  /** Time-series data for trend analysis */
  trendData: TrendData[];
  /** Categorical distribution of expenses */
  categoryDistribution: CategoryData[];
}

/**
 * Time-series data point for trend analysis
 * @interface
 */
export interface TrendData {
  /** Date of the data point */
  date: string;
  /** Amount recorded for the date */
  amount: number;
}

/**
 * Category-wise expense distribution
 * @interface
 */
export interface CategoryData {
  /** Category name */
  category: string;
  /** Total amount in the category */
  amount: number;
  /** Percentage of total expenses */
  percentage: number;
}
