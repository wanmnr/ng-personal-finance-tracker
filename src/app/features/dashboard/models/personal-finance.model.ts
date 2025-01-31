/**
 * @file personal-finance.model.ts
 * @description Type definitions for personal finance tracker app data structures
 * @module Models
 */

// models/category.model.ts
export interface Category {
  id: string;
  name: string;
  type: 'EXPENSE' | 'INCOME';
  color?: string;
  icon?: string;
  description?: string;
}

// models/transaction.model.ts
export interface Transaction {
  id: string;
  amount: number;
  date: Date;
  description: string;
  type: 'EXPENSE' | 'INCOME';
  categoryId: string; // Reference to Category
  notes?: string;
  paymentMethod?: string;
}

// models/budget.model.ts
export interface BudgetItem {
  categoryId: string; // Reference to Category
  amount: number;
  spent: number; // Calculated from transactions
  remaining: number; // Calculated (amount - spent)
}

export interface Budget {
  id: string;
  month: number; // 1-12
  year: number;
  totalBudget: number;
  items: BudgetItem[]; // Array of category budgets
}

// models/budget-summary.model.ts
export interface BudgetSummary {
  budgetId: string;
  period: {
    month: number;
    year: number;
  };
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  categoryBreakdown: {
    categoryId: string;
    allocated: number;
    spent: number;
    remaining: number;
    percentageUsed: number;
  }[];
}
