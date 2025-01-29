/**
 * @file income.model.ts
 * @description Defines the data structure for income entries in the income tracking system
 * @module Models
 */

/**
 * Represents an income entry in the system
 * @interface
 *
 * @property {string} id - Unique identifier for the income entry
 * @property {number} amount - Monetary amount of the income
 * @property {string} source - Source of the income (e.g., 'Salary', 'Freelance')
 * @property {Date} date - Date when the income was or will be received
 * @property {'received' | 'pending' | 'delayed'} status - Current status of the income
 * @property {Date} [dueDate] - Optional due date for pending income
 *
 * @example
 * ```typescript
 * const incomeEntry: Income = {
 *   id: 'inc_123',
 *   amount: 5000,
 *   source: 'Salary',
 *   date: new Date(),
 *   status: 'received'
 * };
 * ```
 */
export interface Income {
  id: string;
  amount: number;
  source: string;
  date: Date;
  status: 'received' | 'pending' | 'delayed';
  dueDate?: Date;
}
