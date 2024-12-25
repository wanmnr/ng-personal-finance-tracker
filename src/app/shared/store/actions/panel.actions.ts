// store/actions/panel.actions.ts
import { createAction, props } from '@ngrx/store';
import { PanelItem } from '@shared/types/panel.interface';

/**
 * Action creators for panel-related operations
 */
export const loadPanels = createAction('[Panel] Load Panels');
export const loadPanelsSuccess = createAction(
  '[Panel] Load Panels Success',
  props<{ items: PanelItem[] }>()
);
export const loadPanelsFailure = createAction(
  '[Panel] Load Panels Failure',
  props<{ error: string }>()
);
export const togglePanel = createAction(
  '[Panel] Toggle Panel',
  props<{ id: string }>()
);
export const selectPanel = createAction(
  '[Panel] Select Panel',
  props<{ id: string }>()
);
