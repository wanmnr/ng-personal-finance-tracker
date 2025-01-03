// store//actions/avatar.actions.ts

import { createAction, props } from '@ngrx/store';
import { AvatarConfig } from '@shared/types/avatar.types';

export const updateAvatarConfig = createAction(
  '[Avatar] Update Config',
  props<{ config: Partial<AvatarConfig> }>()
);

export const loadAvatarImage = createAction(
  '[Avatar] Load Image',
  props<{ imageUrl: string }>()
);

export const loadAvatarImageSuccess = createAction(
  '[Avatar] Load Image Success'
);

export const loadAvatarImageFailure = createAction(
  '[Avatar] Load Image Failure',
  props<{ error: string }>()
);
