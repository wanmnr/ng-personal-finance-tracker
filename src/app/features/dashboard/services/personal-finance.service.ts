// services/personal-finance.service.ts
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
  // Calculate budget usage for a specific period
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

  // Get transactions for a specific category
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
