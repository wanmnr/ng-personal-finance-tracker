// store/selectors/panel.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PanelState } from '@shared/types/panel.interface';

/**
 * Feature selector for panel state
 */
export const selectPanelState = createFeatureSelector<PanelState>('panel');

/**
 * Selects all panel items
 */
export const selectPanelItems = createSelector(
  selectPanelState,
  state => state.items
);

/**
 * Selects loading state
 */
export const selectPanelLoading = createSelector(
  selectPanelState,
  state => state.loading
);

/**
 * Selects error state
 */
export const selectPanelError = createSelector(
  selectPanelState,
  state => state.error
);

/**
 * Selects currently selected panel ID
 */
export const selectSelectedPanelId = createSelector(
  selectPanelState,
  state => state.selectedPanelId
);
