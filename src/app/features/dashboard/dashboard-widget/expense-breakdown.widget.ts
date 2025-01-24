// src/app/widgets/components/expense-breakdown.widget.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetConfig, WidgetData } from './widget.model';
import { PieChart, Cell, Pie, ResponsiveContainer } from 'recharts';

@Component({
  selector: 'app-expense-breakdown-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-4">{{ config.settings.title }}</h3>

      <div *ngIf="data.loading" class="animate-pulse">
        <div class="h-48 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
      </div>

      <div *ngIf="!data.loading && !data.error" class="h-48">
        <div class="flex flex-col space-y-2">
          <div
            *ngFor="let expense of data.data?.expenses"
            class="flex justify-between items-center"
          >
            <span class="flex items-center">
              <span
                class="w-3 h-3 rounded-full mr-2"
                [style.backgroundColor]="expense.color"
              ></span>
              {{ expense.category }}
            </span>
            <span class="font-semibold">
              {{ expense.amount | currency }}
            </span>
          </div>
        </div>
      </div>

      <div *ngIf="data.error" class="text-red-500">
        {{ data.error }}
      </div>
    </div>
  `,
})
export class ExpenseBreakdownWidget implements OnInit {
  @Input() config!: WidgetConfig;
  @Input() data!: WidgetData;

  ngOnInit(): void {
    // Widget-specific initialization
  }
}
