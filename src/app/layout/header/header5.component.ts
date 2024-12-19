// app/core/layout/header/header.component.ts
// Context-Aware Header with Action Menus
import { Component, inject, computed } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faEllipsisV,
  faFilter,
  faSort,
  faColumns
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ContextService } from '@core/services/context.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    FontAwesomeModule
  ],
  template: `
    <mat-toolbar class="bg-white shadow-md">
      <div class="container mx-auto px-4">
        <div class="h-16 flex items-center justify-between">
          <!-- Context Title -->
          <div class="flex items-center gap-4">
            <h1 class="text-xl font-semibold">{{contextTitle()}}</h1>
            <span
              *ngIf="itemCount() !== null"
              class="text-sm text-gray-500">
              {{itemCount()}} items
            </span>
          </div>

          <!-- Context Actions -->
          <div class="flex items-center gap-2">
            @if (showNewButton()) {
              <button
                (click)="onNewItem()"
                class="flex items-center gap-2 px-4 py-2 bg-blue-600
                       text-white rounded-lg hover:bg-blue-700">
                <fa-icon [icon]="plusIcon"></fa-icon>
                New {{contextItem()}}
              </button>
            }

            <!-- Filter Menu -->
            <button
              [matMenuTriggerFor]="filterMenu"
              class="p-2 hover:bg-gray-100 rounded-full">
              <fa-icon [icon]="filterIcon"></fa-icon>
            </button>
            <mat-menu #filterMenu="matMenu">
              <div class="p-4 w-64">
                <h3 class="text-sm font-medium mb-2">Filters</h3>
                @for (filter of availableFilters(); track filter.id) {
                  <div class="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      [checked]="filter.active"
                      (change)="toggleFilter(filter)">
                    <span class="text-sm">{{filter.label}}</span>
                  </div>
                }
              </div>
            </mat-menu>

            <!-- Sort Menu -->
            <button
              [matMenuTriggerFor]="sortMenu"
              class="p-2 hover:bg-gray-100 rounded-full">
              <fa-icon [icon]="sortIcon"></fa-icon>
            </button>
            <mat-menu #sortMenu="matMenu">
              <div class="p-4 w-64">
                <h3 class="text-sm font-medium mb-2">Sort By</h3>
                @for (option of sortOptions(); track option.id) {
                  <button
                    (click)="setSort(option)"
                    class="flex items-center justify-between w-full px-2 py-1
                           hover:bg-gray-100 text-sm">
                    {{option.label}}
                    @if (currentSort()?.id === option.id) {
                      <fa-icon
                        [icon]="option.direction === 'asc' ?
                               sortAscIcon : sortDescIcon">
                      </fa-icon>
                    }
                  </button>
                }
              </div>
            </mat-menu>

            <!-- View Options -->
            <button
              [matMenuTriggerFor]="viewMenu"
              class="p-2 hover:bg-gray-100 rounded-full">
              <fa-icon [icon]="columnsIcon"></fa-icon>
            </button>
            <mat-menu #viewMenu="matMenu">
              <div class="p-4 w-64">
                <h3 class="text-sm font-medium mb-2">View Options</h3>
                @for (column of availableColumns(); track column.id) {
                  <div class="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      [checked]="column.visible"
                      (change)="toggleColumn(column)">
                    <span class="text-sm">{{column.label}}</span>
                  </div>
                }
              </div>
            </mat-menu>

            <!-- More Actions -->
            <button
              [matMenuTriggerFor]="moreMenu"
              class="p-2 hover:bg-gray-100 rounded-full">
              <fa-icon [icon]="moreIcon"></fa-icon>
            </button>
            <mat-menu #moreMenu="matMenu">
              @for (action of contextActions(); track action.id) {
                <button
                  mat-menu-item
                  (click)="executeAction(action)"
                  [disabled]="action.disabled">
                  <fa-icon [icon]="action.icon"></fa-icon>
                  <span class="ml-2">{{action.label}}</span>
                </button>
              }
            </mat-menu>
          </div>
        </div>
      </div>
    </mat-toolbar>
  `
})
export class HeaderComponent {
  private contextService = inject(ContextService);

  // Icons
  plusIcon = faPlus;
  filterIcon = faFilter;
  sortIcon = faSort;
  columnsIcon = faColumns;
  moreIcon = faEllipsisV;

  // Computed state
  contextTitle = computed(() => this.contextService.getContextTitle());
  contextItem = computed(() => this.contextService.getContextItem());
  itemCount = computed(() => this.contextService.getItemCount());
  showNewButton = computed(() => this.contextService.canCreateNew());

  availableFilters = computed(() => this.contextService.getFilters());
  sortOptions = computed(() => this.contextService.getSortOptions());
  currentSort = computed(() => this.contextService.getCurrentSort());
  availableColumns = computed(() => this.contextService.getColumns());
  contextActions = computed(() => this.contextService.getActions());

  onNewItem() {
    this.contextService.createNew();
  }

  toggleFilter(filter: any) {
    this.contextService.toggleFilter(filter);
  }

  setSort(option: any) {
    this.contextService.setSort(option);
  }

  toggleColumn(column: any) {
    this.contextService.toggleColumn(column);
  }

  executeAction(action: any) {
    this.contextService.executeAction(action);
  }
}
