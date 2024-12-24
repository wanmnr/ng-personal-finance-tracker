// store/selectors/pagination.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaginationState } from '@shared/models/pagination.model';

export const selectPaginationState = createFeatureSelector<PaginationState>('pagination');

export const selectCurrentPage = createSelector(
  selectPaginationState,
  (state: PaginationState) => state.currentPage
);

export const selectPageSize = createSelector(
  selectPaginationState,
  (state: PaginationState) => state.pageSize
);

export const selectTotalItems = createSelector(
  selectPaginationState,
  (state: PaginationState) => state.totalItems
);

export const selectTotalPages = createSelector(
  selectPaginationState,
  (state: PaginationState) => state.totalPages
);
