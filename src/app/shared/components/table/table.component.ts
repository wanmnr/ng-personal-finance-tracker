// components/table.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { ColumnConfig, TableState } from '../../types/table.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown
} from '@fortawesome/free-solid-svg-icons';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { TableService } from '@app/shared/services/table.service';
import { updateTableState } from '@app/shared/store/actions/table.actions';

/**
 * Reusable table component with sorting, pagination, and state management
 * @class ReusableTableComponent
 */
@Component({
  selector: 'app-reusable-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FontAwesomeModule,
    MatCheckboxModule
  ]
})
export class ReusableTableComponent implements OnInit, OnDestroy {
  /** Column configuration */
  @Input() columns: ColumnConfig[] = [];

  /** Whether to enable row selection */
  @Input() selectable = false;

  /** Event emitter for row selection */
  @Output() rowSelect = new EventEmitter<any[]>();

  /** Event emitter for sort changes */
  @Output() sortChange = new EventEmitter<{
    column: string;
    direction: 'asc' | 'desc' | '';
  }>();

  /** Font Awesome icons */
  readonly faSort = faSort;
  readonly faSortUp = faSortUp;
  readonly faSortDown = faSortDown;

  /** Subject for handling component destruction */
  private destroy$ = new Subject<void>();

  /** Display columns including select column if enabled */
  displayedColumns: string[] = [];
  currentState!: TableState;
  // Add SelectionModel for checkbox functionality
  selection = new SelectionModel<any>(true, []);

  constructor(
    public tableService: TableService,
    private store: Store<{ table: TableState }>
  ) { }

  ngOnInit(): void {
    this.initializeDisplayColumns();
    this.subscribeToStateChanges();
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.currentState?.data?.length || 0;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.currentState?.data?.forEach(row => this.selection.select(row));
    }
  }

  getSortDirection(column: string): string {
    return this.currentState?.sortColumn === column ?
      this.currentState.sortDirection : '';
  }

  getSortIcon(column: string): any {
    const direction = this.getSortDirection(column);
    if (!direction) return this.faSort;
    return direction === 'asc' ? this.faSortUp : this.faSortDown;
  }

  /**
   * Initializes display columns based on configuration
   */
  private initializeDisplayColumns(): void {
    this.displayedColumns = this.selectable
      ? ['select', ...this.columns.map(col => col.prop)]
      : this.columns.map(col => col.prop);
  }

  /**
   * Subscribes to state changes from both service and store
   */
  private subscribeToStateChanges(): void {
    // Service-based state management
    this.tableService.getState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        // Handle state changes from service
        this.currentState = state;
      });

    // NgRx store state management
    this.store.select('table')
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        // Handle state changes from store
        this.currentState = state;
      });
  }

  /**
   * Handles sort changes
   * @param column - Column to sort by
   */
  onSort(column: ColumnConfig): void {
    if (!column.sortable) return;

    const newDirection = this.getNextSortDirection(
      column.prop,
      this.currentState.sortDirection
    );

    this.store.dispatch(
      updateTableState({
        payload: {
          sortColumn: column.prop,
          sortDirection: newDirection
        }
      })
    );

    this.sortChange.emit({
      column: column.prop,
      direction: newDirection
    });
  }

  /**
   * Gets the next sort direction in the sequence
   * @param column - Column being sorted
   * @param currentDirection - Current sort direction
   * @returns Next sort direction
   */
  private getNextSortDirection(
    column: string,
    currentDirection: 'asc' | 'desc' | ''
  ): 'asc' | 'desc' | '' {
    const directions: ('asc' | 'desc' | '')[] = ['asc', 'desc', ''];
    const currentIndex = directions.indexOf(currentDirection);
    return directions[(currentIndex + 1) % directions.length];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
