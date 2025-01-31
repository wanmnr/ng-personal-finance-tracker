/**
 * @file financial1.model.ts
 * @description Type definitions for financial data structures
 * @module Models
 */

export interface FinancialMetrics {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  totalSavings: number;
  lastUpdated: Date;
}

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  tags?: string[];
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  remaining: number;
  category: TransactionCategory;
  period: BudgetPeriod;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  notifications: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER'
}

export enum TransactionCategory {
  SALARY = 'SALARY',
  INVESTMENT = 'INVESTMENT',
  GROCERIES = 'GROCERIES',
  UTILITIES = 'UTILITIES',
  RENT = 'RENT',
  ENTERTAINMENT = 'ENTERTAINMENT',
  HEALTHCARE = 'HEALTHCARE',
  TRANSPORTATION = 'TRANSPORTATION',
  EDUCATION = 'EDUCATION',
  SHOPPING = 'SHOPPING',
  OTHER = 'OTHER'
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  BANK_TRANSFER = 'BANK_TRANSFER',
  DIGITAL_WALLET = 'DIGITAL_WALLET'
}

export enum BudgetPeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY'
}

export interface MonthlyReport {
  month: number;
  year: number;
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  categoryBreakdown: CategoryBreakdown[];
  trends: TrendMetrics;
}

export interface CategoryBreakdown {
  category: TransactionCategory;
  amount: number;
  percentage: number;
  transactionCount: number;
}

export interface TrendMetrics {
  incomeGrowth: number;
  expenseGrowth: number;
  savingsGrowth: number;
  comparisonPeriod: BudgetPeriod;
}
