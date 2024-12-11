// layout/store/layout.state.ts
import { createActionGroup, props } from '@ngrx/store';
import { createFeature, createReducer, on } from '@ngrx/store';

export interface LayoutState {
  sidenavOpen: boolean;
  theme: 'light' | 'dark';
}

export const initialState: LayoutState = {
  sidenavOpen: true,
  theme: 'light'
};

export const layoutActions = createActionGroup({
  source: 'Layout',
  events: {
    'Toggle Sidenav': props<{ open: boolean }>(),
    'Set Theme': props<{ theme: 'light' | 'dark' }>(),
  }
});

export const layoutFeature = createFeature({
  name: 'layout',
  reducer: createReducer(
    initialState,
    on(layoutActions.toggleSidenav, (state, { open }) => ({
      ...state,
      sidenavOpen: open
    })),
    on(layoutActions.setTheme, (state, { theme }) => ({
      ...state,
      theme
    }))
  )
});
