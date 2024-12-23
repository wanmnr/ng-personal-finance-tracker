// store/table.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as TableActions from '../actions/table.actions';
import { TableState } from '@shared/types/table.interface';

const initialState: TableState = {
  currentPage: 1,
  pageSize: 10,
  totalItems: 0,
  sortDirection: '',
  sortColumn: '',
  loading: false,
  selectedItems: [],
  data: []
};

export const tableReducer = createReducer(
  initialState,
  on(TableActions.loadTableData, (state, { payload }) => ({
    ...state,
    data: payload
  })),
  on(TableActions.updateTableState, (state, { payload }) => ({
    ...state,
    ...payload
  })),
  on(TableActions.resetTableState, () => initialState)
);
