// store/fluid-container.actions.ts

import { createAction, props } from '@ngrx/store';
import { FluidContainerConfig } from '../types/fluid-container.types';

export const updateConfig = createAction(
  '[Fluid Container] Update Config',
  props<{ config: Partial<FluidContainerConfig> }>()
);

export const setLoading = createAction(
  '[Fluid Container] Set Loading',
  props<{ isLoading: boolean }>()
);

export const setError = createAction(
  '[Fluid Container] Set Error',
  props<{ error: string | null }>()
);
