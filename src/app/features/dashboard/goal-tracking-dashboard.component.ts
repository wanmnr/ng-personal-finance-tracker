/**
 * @file goal-tracking-dashboard.component.ts
 * @description Dashboard component for displaying and managing financial goals
 * @module DashboardModule
 * @decorator Component
 */

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFlag,
  faTrophy,
  faChartLine,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { GoalService } from '@dashboard/services/goal.service';
import { FinancialGoal } from '@dashboard/models/goal.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
  template: `
    <div class="dashboard-container p-4 min-h-screen">
      <header class="mb-6">
        <h1 class="text-2xl font-bold">Financial Goals</h1>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <mat-card
          *ngFor="let goal of financialGoals$ | async"
          class="goal-card"
        >
          <mat-card-content>
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <fa-icon
                  [icon]="getGoalIcon(goal.type)"
                  class="text-2xl mr-3"
                  [ngStyle]="{ color: goal.color }"
                >
                </fa-icon>
                <div>
                  <h3 class="font-semibold">{{ goal.name }}</h3>
                  <p class="text-sm text-gray-600">
                    Target: {{ goal.targetAmount | currency }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold">
                  {{ goal.currentAmount | currency }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ goal.deadline | date : 'mediumDate' }}
                </p>
              </div>
            </div>

            <div class="mb-2">
              <mat-progress-bar
                [value]="calculateProgress(goal)"
                [ngClass]="getProgressBarClass(goal)"
              >
              </mat-progress-bar>
              <p class="text-xs text-right mt-1">
                {{ calculateProgress(goal) }}% Complete
              </p>
            </div>

            <div class="mt-4">
              <p class="text-sm" [ngClass]="getStatusClass(goal)">
                {{ getStatusMessage(goal) }}
              </p>
            </div>

            <div class="mt-4 flex justify-between">
              <button mat-button color="primary" (click)="updateGoal(goal)">
                Update Progress
              </button>
              <button
                mat-button
                [color]="goal.completed ? 'accent' : 'warn'"
                (click)="toggleGoalStatus(goal)"
              >
                {{ goal.completed ? 'Reactivate' : 'Complete' }}
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .goal-card {
        @apply bg-white dark:bg-gray-700 transition-all duration-300;

        &:hover {
          @apply shadow-lg;
        }
      }

      .progress-on-track {
        ::ng-deep .mat-progress-bar-fill {
          @apply bg-green-500;
        }
      }

      .progress-warning {
        ::ng-deep .mat-progress-bar-fill {
          @apply bg-yellow-500;
        }
      }

      .progress-behind {
        ::ng-deep .mat-progress-bar-fill {
          @apply bg-red-500;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  /** Observable stream of financial goals */
  financialGoals$: Observable<FinancialGoal[]>;

  /**
   * Creates an instance of DashboardComponent
   * @param goalService - Service for managing financial goals
   */
  constructor(private goalService: GoalService) {
    this.financialGoals$ = this.goalService.getFinancialGoals();
  }

  /**
   * Returns the appropriate icon based on goal type
   * @param type - Type of the financial goal
   * @returns Font Awesome icon for the goal type
   */
  getGoalIcon(type: string): any {
    const iconMap = {
      savings: faFlag,
      investment: faChartLine,
      debt: faClock,
      achievement: faTrophy,
    };
    return iconMap[type as keyof typeof iconMap] || faFlag;
  }

  /**
   * Calculates the progress percentage of a goal
   * @param goal - Financial goal to calculate progress for
   * @returns Progress percentage
   */
  calculateProgress(goal: FinancialGoal): number {
    return (goal.currentAmount / goal.targetAmount) * 100;
  }

  /**
   * Determines the CSS class for progress bar based on progress
   * @param goal - Financial goal to get progress class for
   * @returns CSS class name for progress bar
   */
  getProgressBarClass(goal: FinancialGoal): string {
    const progress = this.calculateProgress(goal);
    if (progress >= 90) return 'progress-on-track';
    if (progress >= 60) return 'progress-warning';
    return 'progress-behind';
  }

  /**
   * Gets the CSS class for status text based on progress
   * @param goal - Financial goal to get status class for
   * @returns CSS class name for status text
   */
  getStatusClass(goal: FinancialGoal): string {
    return this.calculateProgress(goal) >= 100
      ? 'text-green-500'
      : 'text-gray-600';
  }

  /**
   * Gets the status message based on goal progress
   * @param goal - Financial goal to get status message for
   * @returns Status message string
   */
  getStatusMessage(goal: FinancialGoal): string {
    const progress = this.calculateProgress(goal);
    if (progress >= 100) return 'Goal Achieved! 🎉';
    if (progress >= 75) return 'Almost there!';
    if (progress >= 50) return 'Halfway there!';
    return 'Keep going!';
  }

  /**
   * Updates the progress of a financial goal
   * @param goal - Financial goal to update
   */
  updateGoal(goal: FinancialGoal): void {
    const updatedAmount = goal.currentAmount + 1000;
    const updatedGoal = { ...goal, currentAmount: updatedAmount };
    this.goalService.updateGoal(updatedGoal).subscribe();
  }

  /**
   * Toggles the completion status of a goal
   * @param goal - Financial goal to toggle status for
   */
  toggleGoalStatus(goal: FinancialGoal): void {
    const updatedGoal = { ...goal, completed: !goal.completed };
    this.goalService.updateGoal(updatedGoal).subscribe();
  }

  /** Angular lifecycle hook for component initialization */
  ngOnInit(): void {
    // Additional initialization if needed
  }
}
