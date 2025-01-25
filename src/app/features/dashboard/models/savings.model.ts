/**
 * @file savings.model.ts
 * @description Defines interfaces and types for the savings management system.
 * Contains type definitions for savings metrics and goals, ensuring type safety
 * throughout the application. These models are used by both the dashboard
 * component and the savings service.
 * @author [Wan]
 * @version 1.0.0
 */

/**
 * Represents the types of savings metrics that can be tracked
 */
export type SavingsMetricType =
  | 'total'
  | 'monthly'
  | 'emergency'
  | 'investments';

/**
 * Interface representing the structure of savings metrics
 */
export interface SavingsMetrics {
  /** The type of savings metric */
  type: SavingsMetricType;
  /** Display label for the metric */
  label: string;
  /** The monetary amount saved */
  amount: number;
  /** Progress percentage towards the goal */
  progress: number;
  /** Color used for UI representation */
  color: string;
  /** Percentage change from previous period */
  trend: number;
}

/**
 * Interface representing a savings goal
 */
export interface SavingsGoal {
  /** Unique identifier for the goal */
  id: string;
  /** Name of the savings goal */
  name: string;
  /** Current amount saved towards the goal */
  current: number;
  /** Target amount for the goal */
  target: number;
  /** Progress percentage towards the goal */
  progress: number;
  /** Target date for achieving the goal */
  targetDate: Date;
}
