// dashboard-widgets/budget-progress.widget.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  WidgetConfig,
  WidgetData,
} from '@features/dashboard/dashboard-widget/widget.model';

@Component({
  selector: 'app-budget-progress-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-4">{{ config.settings.title }}</h3>

      <div *ngIf="data.loading" class="animate-pulse">
        <div class="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-4"></div>
      </div>

      <div *ngIf="!data.loading && !data.error">
        <div *ngFor="let category of data.data?.categories" class="mb-4">
          <div class="flex justify-between mb-1">
            <span>{{ category.name }}</span>
            <span class="font-semibold">
              {{ category.spent | currency }} / {{ category.budget | currency }}
            </span>
          </div>

          <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              class="h-2.5 rounded-full transition-all duration-500"
              [style.width.%]="(category.spent / category.budget) * 100"
              [ngClass]="{
                'bg-green-600': category.spent / category.budget < 0.8,
                'bg-yellow-500':
                  category.spent / category.budget >= 0.8 &&
                  category.spent / category.budget < 1,
                'bg-red-600': category.spent / category.budget >= 1
              }"
            ></div>
          </div>
        </div>
      </div>

      <div *ngIf="data.error" class="text-red-500">
        {{ data.error }}
      </div>
    </div>
  `,
})
export class BudgetProgressWidget implements OnInit {
  @Input() config!: WidgetConfig;
  @Input() data!: WidgetData;

  ngOnInit(): void {
    // Widget-specific initialization
  }
}
