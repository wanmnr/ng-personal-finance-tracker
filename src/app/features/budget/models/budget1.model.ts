/**
 * @file budget.model.ts
 * @description Contains interfaces and types for budget management functionality
 * @module BudgetModule
 */

import { Category } from '@app/features/dashboard/models/category.model';

export interface Budget {
  id: string;
  name: string;
  category: Category;
  allocated: number;
  spent: number;
  percentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetSummary {
  totalBudget: number;
  totalSpent: number;
  remainingBudget: number;
}

/**
 * Data transfer object for creating a new budget entry
 * @interface
 *
 * @example
 * ```typescript
 * const newBudget: CreateBudgetDto = {
 *   category: 'Food',
 *   limit: 500
 * };
 * ```
 */
export interface CreateBudgetDto {
  /** Category for the new budget */
  category: Category;

  /** Initial spending limit for the budget */
  limit: number;
}

/**
 * Data transfer object for updating an existing budget
 * @interface
 *
 * @example
 * ```typescript
 * const updateData: UpdateBudgetDto = {
 *   id: '123',
 *   spent: 150,
 *   limit: 600
 * };
 * ```
 */
export interface UpdateBudgetDto {
  /** ID of the budget to update */
  id: string;

  /** New spent amount (optional) */
  spent?: number;

  /** New spending limit (optional) */
  limit?: number;
}
