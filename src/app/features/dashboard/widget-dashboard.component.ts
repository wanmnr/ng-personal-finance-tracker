// widget-dashboard.component.ts
// Modular Dashboard with Widget System

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  WidgetConfig,
  WidgetType,
} from '@features/dashboard/models/widget.model';
import { WidgetService } from '@features/dashboard/services/widget.service';
import { WidgetRegistry } from '@features/dashboard/registry/widget.registry';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    FontAwesomeModule,
    // ...WidgetRegistry.getComponents(),
  ],
  template: `
    <div
      class="dashboard-container p-4 min-h-screen bg-gray-50 dark:bg-gray-800"
    >
      <header class="mb-6">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white">
          Customizable Financial Dashboard
        </h1>
        <div class="flex gap-2 mt-2">
          <button
            *ngFor="let widget of availableWidgets"
            (click)="addWidget(widget)"
            class="btn-widget-add"
            [attr.aria-label]="'Add ' + widget.label"
          >
            {{ widget.label }}
          </button>
        </div>
      </header>

      <div
        cdkDropList
        class="widget-grid"
        (cdkDropListDropped)="onWidgetDrop($event)"
      >
        <div
          *ngFor="let widget of widgets$ | async"
          cdkDrag
          class="widget-container"
          [attr.data-widget-type]="widget.type"
        >
          <ng-container
            [ngComponentOutlet]="getWidgetComponent(widget.type)"
            [ngComponentOutletInputs]="getWidgetInputs(widget)"
          >
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .widget-grid {
        @apply grid gap-4;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      }

      .widget-container {
        @apply bg-white dark:bg-gray-700 rounded-lg shadow-md;
        min-height: 200px;

        &.cdk-drag-preview {
          @apply shadow-xl;
        }

        &.cdk-drag-placeholder {
          @apply opacity-50;
        }
      }

      .btn-widget-add {
        @apply px-4 py-2 bg-primary-500 text-white rounded-md
             hover:bg-primary-600 focus:ring-2 focus:ring-primary-500
             focus:ring-offset-2 transition-colors;

        @media (prefers-reduced-motion: reduce) {
          @apply transition-none;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private widgetsSubject = new BehaviorSubject<WidgetConfig[]>([]);
  widgets$: Observable<WidgetConfig[]> = this.widgetsSubject.asObservable();

  availableWidgets = [
    { type: WidgetType.BalanceOverview, label: 'Balance Overview' },
    { type: WidgetType.ExpenseBreakdown, label: 'Expense Breakdown' },
    { type: WidgetType.BudgetProgress, label: 'Budget Progress' },
    { type: WidgetType.SavingsGoals, label: 'Savings Goals' },
  ];

  constructor(private widgetService: WidgetService) {}

  ngOnInit(): void {
    this.loadSavedConfiguration();
  }

  private async loadSavedConfiguration(): Promise<void> {
    const savedWidgets = await this.widgetService.loadWidgetConfiguration();
    this.widgetsSubject.next(savedWidgets);
  }

  getWidgetComponent(type: WidgetType): any {
    return WidgetRegistry.getComponent(type);
  }

  getWidgetInputs(widget: WidgetConfig): Record<string, any> {
    return {
      config: widget,
      data: this.widgetService.getWidgetData(widget.type),
    };
  }

  addWidget(widgetInfo: { type: WidgetType; label: string }): void {
    const newWidget: WidgetConfig = {
      id: `widget-${Date.now()}`,
      type: widgetInfo.type,
      settings: this.getDefaultSettings(widgetInfo.type),
    };

    const currentWidgets = this.widgetsSubject.value;
    this.widgetsSubject.next([...currentWidgets, newWidget]);
    this.saveConfiguration();
  }

  private getDefaultSettings(type: WidgetType): Record<string, any> {
    // Return default settings based on widget type
    return WidgetRegistry.getDefaultSettings(type);
  }

  onWidgetDrop(event: any): void {
    const widgets = this.widgetsSubject.value;
    const { previousIndex, currentIndex } = event;

    const widgetsCopy = [...widgets];
    const [removed] = widgetsCopy.splice(previousIndex, 1);
    widgetsCopy.splice(currentIndex, 0, removed);

    this.widgetsSubject.next(widgetsCopy);
    this.saveConfiguration();
  }

  private async saveConfiguration(): Promise<void> {
    await this.widgetService.saveWidgetConfiguration(this.widgetsSubject.value);
  }
}
