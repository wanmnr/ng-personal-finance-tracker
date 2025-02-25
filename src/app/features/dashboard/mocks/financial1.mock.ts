/**
 * @file financial.mock.ts
 * @module MocksFinancial
 * @description Provides mock financial data for testing and development of the dashboard feature
 *
 * Contains sample data for financial metrics, transactions, budgets, and reports
 * that reflect typical application state for development and testing purposes.
 */

import {
  FinancialMetrics,
  Transaction,
  Budget,
  TransactionType,
  TransactionCategory,
  TransactionStatus,
  PaymentMethod,
  BudgetPeriod,
  MonthlyReport,
  CategoryBreakdown,
  TrendMetrics
} from '../models/financial1.model';

export const mockFinancialMetrics: FinancialMetrics = {
  totalBalance: 25000.00,
  monthlyIncome: 5000.00,
  monthlyExpenses: 3500.00,
  totalSavings: 1500.00,
  lastUpdated: new Date()
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: new Date(),
    amount: 5000.00,
    type: TransactionType.INCOME,
    category: TransactionCategory.SALARY,
    description: 'Monthly Salary',
    status: TransactionStatus.COMPLETED,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    date: new Date(),
    amount: 1000.00,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.RENT,
    description: 'Monthly Rent',
    status: TransactionStatus.COMPLETED,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const mockBudgets: Budget[] = [
  {
    id: '1',
    name: 'Monthly Groceries',
    amount: 500.00,
    spent: 350.00,
    remaining: 150.00,
    category: TransactionCategory.GROCERIES,
    period: BudgetPeriod.MONTHLY,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    isActive: true,
    notifications: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const mockMonthlyReport: MonthlyReport = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  totalIncome: 5000.00,
  totalExpenses: 3500.00,
  netSavings: 1500.00,
  categoryBreakdown: [
    {
      category: TransactionCategory.GROCERIES,
      amount: 500.00,
      percentage: 14.28,
      transactionCount: 5
    },
    {
      category: TransactionCategory.RENT,
      amount: 1000.00,
      percentage: 28.57,
      transactionCount: 1
    }
  ],
  trends: {
    incomeGrowth: 5.5,
    expenseGrowth: 2.3,
    savingsGrowth: 8.7,
    comparisonPeriod: BudgetPeriod.MONTHLY
  }
};
