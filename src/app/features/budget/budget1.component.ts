// src/app/features/budget/budget1.component.ts
// Approach 1: Component with Basic Feature Set

import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faWallet, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate } from '@angular/animations';
import { Store } from '@ngrx/store';
import { BudgetService } from './services/budget.service';
import { Budget } from './models/budget.model';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FontAwesomeModule
  ],
  template: `
    <section
      class="budget-container p-4 md:p-6 lg:p-8"
      role="main"
      aria-labelledby="budget-title">

      <h1
        id="budget-title"
        class="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Budget Overview
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <mat-card
          *ngFor="let budget of budgets$ | async"
          class="budget-card hover:shadow-lg transition-shadow duration-300"
          [@cardAnimation]>

          <mat-card-header>
            <fa-icon [icon]="faWallet" class="text-primary-600"></fa-icon>
            <mat-card-title class="ml-2">{{budget.category}}</mat-card-title>
          </mat-card-header>

          <mat-card-content class="mt-4">
            <div class="flex justify-between items-center">
              <span class="text-lg">
                {{budget.spent | currency}} / {{budget.limit | currency}}
              </span>
              <div
                class="progress-bar h-2 w-24 bg-gray-200 rounded"
                role="progressbar"
                [attr.aria-valuenow]="getPercentage(budget)"
                aria-valuemin="0"
                aria-valuemax="100">
                <div
                  class="h-full bg-primary-600 rounded"
                  [style.width.%]="getPercentage(budget)">
                </div>
              </div>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <button
              mat-button
              color="primary"
              (click)="editBudget(budget)"
              aria-label="Edit budget">
              Edit
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .budget-card {
      @apply bg-white dark:bg-gray-800 rounded-lg p-4;
    }

    .progress-bar {
      transition: width 0.3s ease-in-out;
    }
  `],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetComponent implements OnInit {
  private store = inject(Store);
  private budgetService = inject(BudgetService);

  faWallet = faWallet;
  faChartLine = faChartLine;

  budgets$ = this.store.select(state => state.budgets);

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.budgetService.fetchBudgets().subscribe();
  }

  getPercentage(budget: Budget): number {
    return (budget.spent / budget.limit) * 100;
  }

  editBudget(budget: Budget): void {
    // Implementation
  }
}
