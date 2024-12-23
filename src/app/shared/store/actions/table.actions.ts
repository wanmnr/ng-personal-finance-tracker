// store/table.actions.ts
import { createAction, props } from '@ngrx/store';
import { TableState } from '@shared/types/table.interface';

export const loadTableData = createAction(
  '[Table] Load Data',
  props<{ payload: any[] }>()
);

export const updateTableState = createAction(
  '[Table] Update State',
  props<{ payload: Partial<TableState> }>()
);

export const resetTableState = createAction('[Table] Reset State');
