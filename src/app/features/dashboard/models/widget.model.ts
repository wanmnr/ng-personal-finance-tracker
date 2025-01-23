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
