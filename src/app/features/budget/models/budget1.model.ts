/**
 * @file budget.model.ts
 * @description Contains interfaces and types for budget management functionality
 * @module BudgetModule
 */

/**
 * TODO: Integrating validation logic directly into DTOs
 * Validation logic and stricter typing could be
 * implemented using libraries like `class-validator`
 * or by creating custom validation utilities
 * @author Wan
 */

/**
 * TODO: Exploring stricter typing options for specific properties like `id` and `percentage`
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
  category: Category;
  allocated: number;
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
  id: string;
  allocated?: number;
  spent?: number;
}
