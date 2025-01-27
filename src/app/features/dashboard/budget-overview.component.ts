// components/budget-overview/budget-overview.component.ts

import { Component, OnInit, inject, signal } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FinanceService } from '@dashboard/services/personal-finance.service';
import {
  BudgetSummary,
  Category,
  Transaction,
  Budget,
} from '@dashboard/models/personal-finance.model';
import { MYRCurrencyPipe } from '@shared/pipes/myr-currency.pipe';
import { Observable, combineLatest, map } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { NumberPipe } from '../../shared/pipes/number.pipe';

interface CategoryWithBreakdown {
  name: string;
  allocated: number;
  spent: number;
  percentageUsed: number;
}

@Component({
  selector: 'app-budget-overview',
  standalone: true,
  imports: [AsyncPipe, MYRCurrencyPipe, NumberPipe],
  template: `
    @if (budgetSummary$ | async; as summary) {
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-6">Budget Overview</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="p-4 bg-gray-100 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Total Budget</h3>
          <p class="text-2xl">{{ summary.totalBudget | myrCurrency }}</p>
        </div>

        <div class="p-4 bg-gray-100 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Total Spent</h3>
          <p class="text-2xl">{{ summary.totalSpent | myrCurrency }}</p>
        </div>

        <div class="p-4 bg-gray-100 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Remaining</h3>
          <p class="text-2xl">{{ summary.totalRemaining | myrCurrency }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (category of summary.categoryBreakdown; track category.categoryId)
        {
        <div class="p-4 border rounded-lg">
          <h3 class="text-lg font-semibold mb-4">
            {{ getCategoryName(category.categoryId, categories()) }}
          </h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Allocated:</span>
              <span>{{ category.allocated | myrCurrency }}</span>
            </div>
            <div class="flex justify-between">
              <span>Spent:</span>
              <span>{{ category.spent | myrCurrency }}</span>
            </div>
            <div class="mt-4">
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  class="bg-blue-600 h-2.5 rounded-full"
                  [style.width.%]="category.percentageUsed"
                  [class.bg-red-600]="category.percentageUsed > 100"
                ></div>
              </div>
              <div class="text-sm text-right mt-1">
                {{ category.percentageUsed | number : '1.0-0' }}%
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
    } @else {
    <div class="p-4 text-center">
      <p>Loading budget data...</p>
    </div>
    }
  `,
})
export default class BudgetOverviewComponent implements OnInit {
  private financeService = inject(FinanceService);

  // Signals or Observables for the data
  categories = signal<Category[]>([]);
  currentBudget = signal<Budget | null>(null);
  transactions = signal<Transaction[]>([]);

  budgetSummary$: Observable<BudgetSummary | null> = combineLatest([
    toObservable(this.currentBudget),
    toObservable(this.transactions),
    toObservable(this.categories),
  ]).pipe(
    map(([budget, transactions, categories]) => {
      if (!budget || !transactions.length || !categories.length) {
        return null;
      }
      return this.financeService.calculateBudgetUsage(
        budget,
        transactions,
        categories
      );
    })
  );

  ngOnInit() {
    // Here you would initialize your data from your data service
    // This is just an example - replace with actual data fetching logic
    this.loadInitialData();
  }

  public getCategoryName(categoryId: string, categories: Category[]): string {
    return (
      categories.find((cat) => cat.id === categoryId)?.name ??
      'Unknown Category'
    );
  }

  private loadInitialData() {
    // Example implementation - replace with actual data fetching
    // this.categoriesService.getCategories().subscribe(
    //   categories => this.categories.set(categories)
    // );
    // this.budgetService.getCurrentBudget().subscribe(
    //   budget => this.currentBudget.set(budget)
    // );
    // this.transactionService.getTransactions().subscribe(
    //   transactions => this.transactions.set(transactions)
    // );
  }
}
