// src/app/features/budget/budget1.component.ts
// Approach 1: Component with Basic Feature Set

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWallet, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { BudgetService } from './services/budget1.service';
import { Budget } from './models/budget1.model';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, FontAwesomeModule],
  templateUrl: './budget1.component.html',
  styleUrls: ['./budget1.component.html'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetComponent implements OnInit {
  private store = inject(Store);
  private budgetService = inject(BudgetService);

  faWallet = faWallet;
  faChartLine = faChartLine;

  budgets$ = this.store.select((state) => state.budgets);

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.budgetService.fetchBudgets().subscribe();
  }

  getPercentage(budget: Budget): number {
    return (budget.spent / budget.allocated) * 100;
  }

  editBudget(budget: Budget): void {
    // Implementation
  }
}
