// app/demo/myr-currency.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MYRCurrencyPipe } from '@shared/pipes/myr-currency.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MYRCurrencyPipe, CommonModule],
  template: `
    <div class="dashboard">
      <div class="card">
        <h3>Account Balance</h3>
        <p class="balance">{{ totalBalance | myrCurrency }}</p>
      </div>

      <div class="transactions">
        <h3>Recent Transactions</h3>
        <div class="transaction-item" *ngFor="let transaction of transactions">
          <span>{{ transaction.description }}</span>
          <!-- Using with custom decimals and without symbol -->
          <span [class]="transaction.type">
            {{ transaction.amount | myrCurrency:true:2 }}
          </span>
        </div>
      </div>

      <div class="summary">
        <div class="income">
          <h4>Total Income</h4>
          <p>{{ totalIncome | myrCurrency }}</p>
        </div>
        <div class="expenses">
          <h4>Total Expenses</h4>
          <p>{{ totalExpenses | myrCurrency }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 20px;
    }

    .card {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .balance {
      font-size: 2em;
      color: #2c3e50;
    }

    .transaction-item {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }

    .income {
      color: #27ae60;
    }

    .expense {
      color: #e74c3c;
    }

    .summary {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 20px;
    }
  `],
})
export class MYRCurrencyComponent {
  totalBalance = 25000.75;
  totalIncome = 30000.00;
  totalExpenses = 4999.25;

  transactions = [
    { description: 'Salary', amount: 5000.00, type: 'income' },
    { description: 'Groceries', amount: -250.50, type: 'expense' },
    { description: 'Utilities', amount: -150.00, type: 'expense' },
    { description: 'Freelance Work', amount: 1000.00, type: 'income' },
  ];
}
