// store/avatar.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { AvatarState } from '@shared/types/avatar.types';
import * as AvatarActions from '@shared/store/actions/avatar.actions';

export const initialState: AvatarState = {
  config: {
    size: 'medium',
    shape: 'circle',
    sourceType: 'initials',
    backgroundColor: '#e0e0e0',
    textColor: '#000000'
  },
  isLoading: false,
  error: null
};

export const avatarReducer = createReducer(
  initialState,
  on(AvatarActions.updateAvatarConfig, (state, { config }) => ({
    ...state,
    config: { ...state.config, ...config }
  })),
  on(AvatarActions.loadAvatarImage, state => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(AvatarActions.loadAvatarImageSuccess, state => ({
    ...state,
    isLoading: false
  })),
  on(AvatarActions.loadAvatarImageFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  }))
);
