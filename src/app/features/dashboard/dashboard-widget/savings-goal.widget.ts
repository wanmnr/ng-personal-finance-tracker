// dashboard-widgets/savings-goals.widget.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetConfig, WidgetData } from './widget.model';

@Component({
  selector: 'app-savings-goals-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-4">{{ config.settings.title }}</h3>

      <div *ngIf="data.loading" class="animate-pulse">
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
          <div class="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
          <div class="h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
        </div>
      </div>

      <div *ngIf="!data.loading && !data.error">
        <div *ngFor="let goal of data.data?.goals" class="mb-6 last:mb-0">
          <div class="flex justify-between items-center mb-2">
            <span class="font-medium">{{ goal.name }}</span>
            <span class="text-sm text-gray-600 dark:text-gray-300">
              {{ goal.targetDate | date }}
            </span>
          </div>

          <div class="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span
              >{{ goal.current | currency }} /
              {{ goal.target | currency }}</span
            >
          </div>

          <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              class="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              [style.width.%]="(goal.current / goal.target) * 100"
            ></div>
          </div>

          <div class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {{ (goal.current / goal.target) * 100 | number : '1.0-0' }}%
            Complete
          </div>
        </div>
      </div>

      <div *ngIf="data.error" class="text-red-500">
        {{ data.error }}
      </div>
    </div>
  `,
})
export class SavingsGoalsWidget implements OnInit {
  @Input() config!: WidgetConfig;
  @Input() data!: WidgetData;

  ngOnInit(): void {
    // Widget-specific initialization
  }
}
