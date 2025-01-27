// app/layout/services/context6.service.ts

import { Injectable, signal } from '@angular/core';
import {
  FilterOption,
  SortOption,
  ColumnOption,
  ContextAction,
} from '../types/context6.types';
import { faEdit, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  private contextTitle = signal<string>('Dashboard');
  private contextItem = signal<string>('Item');
  private itemCount = signal<number>(0);
  private canCreate = signal<boolean>(true);

  private filters = signal<FilterOption[]>([
    { id: 'active', label: 'Active Only', active: false },
    { id: 'archived', label: 'Include Archived', active: false },
  ]);

  private sortOptions = signal<SortOption[]>([
    { id: 'name', label: 'Name', direction: 'asc' },
    { id: 'date', label: 'Date Created', direction: 'desc' },
  ]);

  private currentSort = signal<SortOption | null>(null);

  private columns = signal<ColumnOption[]>([
    { id: 'name', label: 'Name', visible: true },
    { id: 'status', label: 'Status', visible: true },
    { id: 'date', label: 'Date', visible: true },
  ]);

  private actions = signal<ContextAction[]>([
    {
      id: 'edit',
      label: 'Edit',
      icon: faEdit,
      disabled: false,
      execute: () => console.log('Edit action'),
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: faTrash,
      disabled: false,
      execute: () => console.log('Delete action'),
    },
    {
      id: 'export',
      label: 'Export',
      icon: faDownload,
      disabled: false,
      execute: () => console.log('Export action'),
    },
  ]);

  getContextTitle(): string {
    return this.contextTitle();
  }

  getContextItem(): string {
    return this.contextItem();
  }

  getItemCount(): number {
    return this.itemCount();
  }

  canCreateNew(): boolean {
    return this.canCreate();
  }

  getFilters(): FilterOption[] {
    return this.filters();
  }

  getSortOptions(): SortOption[] {
    return this.sortOptions();
  }

  getCurrentSort(): SortOption | null {
    return this.currentSort();
  }

  getColumns(): ColumnOption[] {
    return this.columns();
  }

  getActions(): ContextAction[] {
    return this.actions();
  }

  createNew(): void {
    console.log('Creating new item');
  }

  toggleFilter(filter: FilterOption): void {
    const updatedFilters = this.filters().map((f) =>
      f.id === filter.id ? { ...f, active: !f.active } : f
    );
    this.filters.set(updatedFilters);
  }

  setSort(option: SortOption): void {
    const currentSort = this.currentSort();
    if (currentSort?.id === option.id) {
      option.direction = option.direction === 'asc' ? 'desc' : 'asc';
    }
    this.currentSort.set(option);
  }

  toggleColumn(column: ColumnOption): void {
    const updatedColumns = this.columns().map((c) =>
      c.id === column.id ? { ...c, visible: !c.visible } : c
    );
    this.columns.set(updatedColumns);
  }

  executeAction(action: ContextAction): void {
    action.execute();
  }
}
