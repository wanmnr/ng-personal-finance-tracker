// app/core/layout/header/header5.component.ts
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
  faColumns,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ContextService } from '@layout/services/context5.service';
import {
  FilterOption,
  SortOption,
  ColumnOption,
  ContextAction,
} from '@layout/models/context5.types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatMenuModule, FontAwesomeModule],
  templateUrl: './header5.component.html',
})
export class HeaderComponent {
  private contextService = inject(ContextService);

  // Icons
  plusIcon = faPlus;
  filterIcon = faFilter;
  sortIcon = faSort;
  sortAscIcon = faSortUp;
  sortDescIcon = faSortDown;
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
