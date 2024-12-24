// store/reducers/pagination.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { PaginationState } from '@shared/models/pagination.model';
import { PaginationActions } from '@shared/store/actions/pagination.actions';

export const initialPaginationState: PaginationState = {
  currentPage: 1,
  pageSize: 10,
  totalItems: 0,
  totalPages: 0,
};

export const paginationReducer = createReducer(
  initialPaginationState,
  on(PaginationActions.setCurrentPage, (state, { page }) => ({
    ...state,
    currentPage: page,
    totalPages: Math.ceil(state.totalItems / state.pageSize),
  })),
  on(PaginationActions.setPageSize, (state, { pageSize }) => ({
    ...state,
    pageSize,
    totalPages: Math.ceil(state.totalItems / pageSize),
    currentPage: 1,
  })),
  on(PaginationActions.setTotalItems, (state, { totalItems }) => ({
    ...state,
    totalItems,
    totalPages: Math.ceil(totalItems / state.pageSize),
  })),
  on(PaginationActions.updatePaginationState, (state, { state: newState }) => ({
    ...state,
    ...newState,
  })),
  on(PaginationActions.resetPagination, () => initialPaginationState)
);
