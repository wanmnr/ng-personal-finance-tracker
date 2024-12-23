// store/fluid-container.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { FluidContainerState } from '../types/fluid-container.types';
import * as FluidContainerActions from './fluid-container.actions';

export const initialState: FluidContainerState = {
  config: {
    maxWidth: '1200px',
    minWidth: '320px',
    padding: '1rem',
    isFullWidth: false,
  },
  isLoading: false,
  error: null,
};

export const fluidContainerReducer = createReducer(
  initialState,
  on(FluidContainerActions.updateConfig, (state, { config }) => ({
    ...state,
    config: { ...state.config, ...config },
  })),
  on(FluidContainerActions.setLoading, (state, { isLoading }) => ({
    ...state,
    isLoading,
  })),
  on(FluidContainerActions.setError, (state, { error }) => ({
    ...state,
    error,
  }))
);
