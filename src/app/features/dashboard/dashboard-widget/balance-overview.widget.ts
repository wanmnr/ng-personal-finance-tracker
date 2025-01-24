// widgets/balance-overview.widget.ts
import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetConfig, WidgetData } from './widget.model';
import { WidgetRegistry } from './widget.registry';
import { WidgetType } from './widget.model';

@Component({
  selector: 'app-balance-overview-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-4">{{ config.settings.title }}</h3>
      <ng-container *ngIf="data.loading">
        <div class="animate-pulse">Loading...</div>
      </ng-container>
      <ng-container *ngIf="!data.loading && !data.error">
        <div class="text-2xl font-bold">
          {{ data.data?.balance | currency }}
        </div>
      </ng-container>
      <div *ngIf="data.error" class="text-red-500">
        {{ data.error }}
      </div>
    </div>
  `,
})
export class BalanceOverviewWidget implements OnInit {
  @Input() config!: WidgetConfig;
  @Input() data!: WidgetData;

  ngOnInit(): void {
    // Widget-specific initialization
  }
}

// Register the widget
WidgetRegistry.registerWidget(
  WidgetType.BalanceOverview,
  BalanceOverviewWidget,
  {
    title: 'Balance Overview',
    refreshInterval: 60000,
  }
);
