// src/app/features/budget/budget.model.ts

/**
 * Represents the possible budget categories in the application
 */
export type BudgetCategory =
  | 'Housing'
  | 'Transportation'
  | 'Food'
  | 'Utilities'
  | 'Healthcare'
  | 'Entertainment'
  | 'Other';

/**
 * Represents a single budget entry in the system
 */
export interface Budget {
  /** Unique identifier for the budget */
  id: string;

  /** Category of the budget */
  category: BudgetCategory;

  /** Amount spent in this budget category */
  spent: number;

  /** Maximum limit set for this budget category */
  limit: number;

  /** Date when the budget was created */
  createdAt: Date;

  /** Date when the budget was last updated */
  updatedAt: Date;
}

/**
 * Data transfer object for creating a new budget
 */
export interface CreateBudgetDto {
  category: BudgetCategory;
  limit: number;
}

/**
 * Data transfer object for updating an existing budget
 */
export interface UpdateBudgetDto {
  id: string;
  spent?: number;
  limit?: number;
}
