// @shared/pipes/enhanced-memoization.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '@features/dashboard/models/finance2.model';

@Pipe({
  name: 'financialCalculations',
  standalone: true
})
export class FinancialCalculationsPipe implements PipeTransform {
  private lastTransactions: Transaction[] | null = null;
  private lastOperation: string | null = null;
  private lastTimeframe: string | null = null;
  private lastResult: any = null;

  transform(
    transactions: Transaction[],
    operation: 'totalBalance' | 'categorySpending' | 'monthlyTrend',
    timeframe: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly',
    category?: string
  ): any {
    const inputHash = this.generateHash(transactions, operation, timeframe, category);

    if (
      this.lastTransactions === transactions &&
      this.lastOperation === operation &&
      this.lastTimeframe === timeframe
    ) {
      console.log('Returning memoized result');
      return this.lastResult;
    }

    console.log('Performing new calculation');
    this.lastTransactions = transactions;
    this.lastOperation = operation;
    this.lastTimeframe = timeframe;

    switch (operation) {
      case 'totalBalance':
        this.lastResult = this.calculateTotalBalance(transactions);
        break;
      case 'categorySpending':
        this.lastResult = this.calculateCategorySpending(transactions, category);
        break;
      case 'monthlyTrend':
        this.lastResult = this.calculateMonthlyTrend(transactions, timeframe);
        break;
    }

    return this.lastResult;
  }

  private generateHash(
    transactions: Transaction[],
    operation: string,
    timeframe: string,
    category?: string
  ): string {
    return `${transactions.length}-${operation}-${timeframe}-${category}`;
  }

  private calculateTotalBalance(transactions: Transaction[]): number {
    return transactions.reduce((acc, curr) => {
      return acc + (curr.type === 'income' ? curr.amount : -curr.amount);
    }, 0);
  }

  private calculateCategorySpending(
    transactions: Transaction[],
    category?: string
  ): { [key: string]: number } {
    const spending: { [key: string]: number } = {};

    transactions
      .filter(t => !category || t.category === category)
      .forEach(t => {
        spending[t.category] = (spending[t.category] || 0) + t.amount;
      });

    return spending;
  }

  private calculateMonthlyTrend(
    transactions: Transaction[],
    timeframe: string
  ): { date: string; amount: number }[] {
    // Simulate expensive calculation
    const trend: { date: string; amount: number }[] = [];
    const grouped = this.groupByTimeframe(transactions, timeframe);

    for (const [date, txs] of Object.entries(grouped)) {
      trend.push({
        date,
        amount: txs.reduce((sum, tx) =>
          sum + (tx.type === 'income' ? tx.amount : -tx.amount), 0)
      });
    }

    return trend;
  }

  private groupByTimeframe(transactions: Transaction[], timeframe: string): { [key: string]: Transaction[] } {
    return transactions.reduce((groups, tx) => {
      const date = new Date(tx.date);
      let key: string;

      switch (timeframe) {
        case 'daily':
          key = date.toISOString().split('T')[0];
          break;
        case 'weekly':
          key = `${date.getFullYear()}-W${this.getWeekNumber(date)}`;
          break;
        case 'monthly':
          key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
          break;
        case 'yearly':
          key = date.getFullYear().toString();
          break;
        default:
          key = date.toISOString().split('T')[0];
      }

      groups[key] = groups[key] || [];
      groups[key].push(tx);
      return groups;
    }, {} as { [key: string]: Transaction[] });
  }

  private getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
}
