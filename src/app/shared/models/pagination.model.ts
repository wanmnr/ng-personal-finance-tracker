// models/pagination.model.ts

/**
 * Interface representing pagination state
 * @interface PaginationState
 */
export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

/**
 * Interface for pagination configuration options
 * @interface PaginationConfig
 */
export interface PaginationConfig {
  itemsPerPageOptions: number[];
  defaultPageSize: number;
  maxDisplayedPages: number;
}
