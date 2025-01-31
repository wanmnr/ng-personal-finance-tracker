/**
 * @file goal.model.ts
 * @description Defines the interface for financial goals and their properties
 *  @module Models
 */

/**
 * Interface representing a financial goal with its properties
 */
export interface FinancialGoal {
  /** Unique identifier for the goal */
  id: string;
  /** Name or title of the financial goal */
  name: string;
  /** Category or type of the financial goal */
  type: 'savings' | 'investment' | 'debt' | 'achievement';
  /** Target amount to be reached */
  targetAmount: number;
  /** Current amount achieved */
  currentAmount: number;
  /** Deadline for achieving the goal */
  deadline: Date;
  /** Color associated with the goal for UI purposes */
  color: string;
  /** Flag indicating if the goal has been completed */
  completed: boolean;
}
