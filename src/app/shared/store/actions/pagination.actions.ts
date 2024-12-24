// store/actions/pagination.actions.ts

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PaginationState } from '@shared/models/pagination.model';

export const PaginationActions = createActionGroup({
  source: 'Pagination',
  events: {
    'Set Current Page': props<{ page: number }>(),
    'Set Page Size': props<{ pageSize: number }>(),
    'Set Total Items': props<{ totalItems: number }>(),
    'Update Pagination State': props<{ state: PaginationState }>(),
    'Reset Pagination': emptyProps(),
  },
});
