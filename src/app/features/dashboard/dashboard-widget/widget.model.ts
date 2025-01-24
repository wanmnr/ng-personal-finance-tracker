// widget.model.ts

export enum WidgetType {
  BalanceOverview = 'balance-overview',
  ExpenseBreakdown = 'expense-breakdown',
  BudgetProgress = 'budget-progress',
  SavingsGoals = 'savings-goals',
}

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  settings: Record<string, any>;
}

export interface WidgetData {
  loading: boolean;
  error?: string;
  data: any;
}

export interface BaseWidgetSettings {
  title: string;
  refreshInterval?: number;
}

// Usage data structure

// Example data structures expected by the widgets
// interface ExpenseData {
//   expenses: Array<{
//     category: string;
//     amount: number;
//     color: string;
//   }>;
// }

// interface BudgetData {
//   categories: Array<{
//     name: string;
//     spent: number;
//     budget: number;
//   }>;
// }

// interface SavingsData {
//   goals: Array<{
//     name: string;
//     current: number;
//     target: number;
//     targetDate: Date;
//   }>;
// }
