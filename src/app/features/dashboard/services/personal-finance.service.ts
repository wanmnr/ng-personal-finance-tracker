/**
 * @file services/personal-finance.service.ts
 * @module PersonalFinanceService
 * @description Core service for personal finance budget calculations and transaction management.
 */

import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  Category,
  Transaction,
  Budget,
  BudgetSummary,
  BudgetItem,
} from '@dashboard/models/personal-finance.model';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  /**
   * Produces a complete budget summary with spending analysis for a specified budget period
   *
   * @param budget - The budget configuration to analyze
   * @param transactions - All available transactions to be filtered by period
   * @param categories - Available expense categories
   * @returns Comprehensive budget summary with spending metrics and category breakdown
   */
  calculateBudgetUsage(
    budget: Budget,
    transactions: Transaction[],
    categories: Category[]
  ): BudgetSummary {
    const periodTransactions = transactions.filter(
      (t) =>
        new Date(t.date).getMonth() + 1 === budget.month &&
        new Date(t.date).getFullYear() === budget.year
    );

    const categoryBreakdown = budget.items.map((item) => {
      const categoryTransactions = periodTransactions.filter(
        (t) => t.categoryId === item.categoryId
      );

      const spent = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);

      return {
        categoryId: item.categoryId,
        allocated: item.amount,
        spent,
        remaining: item.amount - spent,
        percentageUsed: (spent / item.amount) * 100,
      };
    });

    return {
      budgetId: budget.id,
      period: {
        month: budget.month,
        year: budget.year,
      },
      totalBudget: budget.totalBudget,
      totalSpent: categoryBreakdown.reduce((sum, item) => sum + item.spent, 0),
      totalRemaining: categoryBreakdown.reduce(
        (sum, item) => sum + item.remaining,
        0
      ),
      categoryBreakdown,
    };
  }

  /**
   * Filters transactions by their assigned category
   *
   * @param categoryId - Category identifier to filter by
   * @param transactions - Collection of transactions to filter
   * @returns Transactions belonging to the specified category
   */
  getTransactionsByCategory(
    categoryId: string,
    transactions: Transaction[]
  ): Transaction[] {
    return transactions.filter((t) => t.categoryId === categoryId);
  }

  // Get budget status for a category
  getCategoryBudgetStatus(
    categoryId: string,
    budget: Budget
  ): BudgetItem | undefined {
    return budget.items.find((item) => item.categoryId === categoryId);
  }
}
