// interfaces/table.interface.ts
/**
 * Represents the configuration for table columns
 * @interface ColumnConfig
 */
export interface ColumnConfig {
  /** Property name from the data object */
  prop: string;
  /** Display name for the column header */
  name: string;
  /** Optional sort function for custom sorting */
  sortFn?: (a: any, b: any) => number;
  /** Whether the column is sortable */
  sortable?: boolean;
  /** Custom cell template reference */
  cellTemplate?: any;
  /** CSS classes for the column */
  classes?: string[];
}

/**
 * Represents the table state
 * @interface TableState
 */
export interface TableState {
  /** Current page number */
  currentPage: number;
  /** Items per page */
  pageSize: number;
  /** Total items count */
  totalItems: number;
  /** Sort direction */
  sortDirection: 'asc' | 'desc' | '';
  /** Sort column */
  sortColumn: string;
  /** Loading state */
  loading: boolean;
  /** Selected items */
  selectedItems: any[];
  /** Table data */
  data: any[];
}
