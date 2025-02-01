/**
 * @file auth.reducer.ts
 * @description Authentication reducer for managing auth-related state transitions
 * @module AuthModule
 */

import { createReducer, on } from '@ngrx/store';
import { AuthState } from './auth.types';
import { AuthActions } from './auth.actions';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    loading: false,
  }))
  // Add other reducer cases...
);
