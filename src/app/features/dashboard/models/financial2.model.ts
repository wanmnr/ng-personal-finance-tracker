/**
 * @file financial2.model.ts
 * @description Type definitions for financial data structures
 * @module Models
 */

export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
  description: string;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  budget?: number;
}

export interface DashboardMetric {
  type: string;
  label: string;
  value: number;
  trend: number;
  icon: unknown; // Changed 'any' to 'unknown' for better type safety
  isHighlighted: boolean;
  isNegative: boolean;
}

export interface FinancialMetrics {
  totalBalance: number;
  previousBalance: number;
  totalIncome: number;
  totalExpenses: number;
  savingsRate: number;
  monthlyChange: number;
}

export interface TransactionSummary {
  recent: Transaction[];
  categoryBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  dailyTotals: Array<{
    date: Date;
    income: number;
    expense: number;
  }>;
}

export interface DashboardPreferences {
  layoutType: 'compact' | 'comfortable';
  visibleMetrics: string[];
  defaultTimeframe: 'daily' | 'weekly' | 'monthly';
  refreshInterval: number;
}
