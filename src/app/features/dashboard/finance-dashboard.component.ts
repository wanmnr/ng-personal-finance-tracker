// @features/dashboard/finance-dashboard.component.ts
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from './models/finance2.model';
import { FinancialCalculationsPipe } from '@app/shared/pipes/enhanced-memoization.pipe';

@Component({
  selector: 'app-finance-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <div class="card">
        <h3>Total Balance</h3>
        <div class="amount">
          {{ totalBalance() | currency }}
        </div>
      </div>

      <div class="card">
        <h3>Monthly Spending by Category</h3>
        <div class="category-list">
          @for (category of categorySpending(); track category.category) {
          <div class="category-item">
            <span>{{ category.category }}</span>
            <span>{{ category.amount | currency }}</span>
          </div>
          }
        </div>
      </div>

      <div class="card">
        <h3>Financial Trend</h3>
        <div class="trend-list">
          @for (trend of monthlyTrend(); track trend.date) {
          <div class="trend-item">
            <span>{{ trend.date | date : 'MMM yyyy' }}</span>
            <span
              [class.positive]="trend.amount > 0"
              [class.negative]="trend.amount < 0"
            >
              {{ trend.amount | currency }}
            </span>
          </div>
          }
        </div>
      </div>

      <div class="actions">
        <button (click)="addTransaction()">Add Sample Transaction</button>
        <button (click)="changeTimeframe()">Change Timeframe</button>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
        padding: 1rem;
      }

      .card {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .amount {
        font-size: 1.5rem;
        font-weight: bold;
        color: #2c3e50;
      }

      .category-list,
      .trend-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .category-item,
      .trend-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
      }

      .positive {
        color: #27ae60;
      }
      .negative {
        color: #e74c3c;
      }

      .actions {
        grid-column: 1/-1;
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
      }

      button {
        padding: 0.5rem 1rem;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      button:hover {
        background: #2980b9;
      }
    `,
  ],
})
export class Finance2DashboardComponent {
  private financialCalculations = new FinancialCalculationsPipe();

  timeframe = signal<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');

  transactions = signal<Transaction[]>([
    {
      id: '1',
      amount: 5000,
      type: 'income',
      category: 'Salary',
      date: new Date(2024, 0, 1),
      description: 'Monthly salary',
      status: 'completed',
      paymentMethod: 'bank',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      amount: 1000,
      type: 'expense',
      category: 'Rent',
      date: new Date(2024, 0, 5),
      description: 'Monthly rent',
      status: 'completed',
      paymentMethod: 'bank',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  // Create a computed signal for total balance
  totalBalance = computed(() => {
    return this.financialCalculations.transform(
      this.transactions(),
      'totalBalance'
    );
  });


  categorySpending = computed(() => {
    const spending = this.financialCalculations.transform(
      this.transactions(),
      'categorySpending'
    );
    return Object.entries(spending).map(([category, amount]) => ({
      category,
      amount: amount as number,
    }));
  });

  monthlyTrend = computed(() => {
    return this.financialCalculations.transform(
      this.transactions(),
      'monthlyTrend',
      this.timeframe()
    ) as Array<{ date: Date; amount: number }>;
  });

  addTransaction() {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: Math.random() * 1000,
      type: Math.random() > 0.5 ? 'income' : 'expense',
      category: ['Food', 'Transport', 'Entertainment', 'Shopping'][
        Math.floor(Math.random() * 4)
      ],
      date: new Date(),
      description: 'Sample transaction',
      status: 'completed',
      paymentMethod: 'bank',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.transactions.update((txs) => [...txs, newTransaction]);
  }

  changeTimeframe() {
    const timeframes: ('daily' | 'weekly' | 'monthly' | 'yearly')[] = [
      'daily',
      'weekly',
      'monthly',
      'yearly',
    ];
    const currentIndex = timeframes.indexOf(this.timeframe());
    const nextIndex = (currentIndex + 1) % timeframes.length;
    this.timeframe.set(timeframes[nextIndex]);
  }
}
