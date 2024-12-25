// store/reducer/panel.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { PanelState } from '@shared/types/panel.interface';
import * as PanelActions from '@shared/store/actions/panel.actions';
/**
 * Initial state for the panel feature
 */
export const initialState: PanelState = {
  items: [],
  loading: false,
  error: null,
  selectedPanelId: null
};

/**
 * Panel reducer handling state transitions
 */
export const panelReducer = createReducer(
  initialState,
  on(PanelActions.loadPanels, state => ({
    ...state,
    loading: true
  })),
  on(PanelActions.loadPanelsSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false,
    error: null
  })),
  on(PanelActions.loadPanelsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(PanelActions.togglePanel, (state, { id }) => ({
    ...state,
    items: state.items.map(item =>
      item.id === id ? { ...item, isExpanded: !item.isExpanded } : item
    )
  })),
  on(PanelActions.selectPanel, (state, { id }) => ({
    ...state,
    selectedPanelId: id
  }))
);
