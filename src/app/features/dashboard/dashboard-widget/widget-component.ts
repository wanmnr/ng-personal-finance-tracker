// dashboard-widgets/widget-components.ts
import { Type } from '@angular/core';
import { BalanceOverviewWidget } from './balance-overview.widget';
import { ExpenseBreakdownWidget } from './expense-breakdown.widget';
import { BudgetProgressWidget } from './budget-progress.widget';
import { SavingsGoalsWidget } from './savings-goal.widget';

export const WIDGET_COMPONENTS: Type<any>[] = [
  BalanceOverviewWidget,
  ExpenseBreakdownWidget,
  BudgetProgressWidget,
  SavingsGoalsWidget,
];
