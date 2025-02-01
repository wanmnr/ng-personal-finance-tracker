/**
 * @file auth.actions.ts
 * @description Authentication action creators for login, signup,
 * and logout operations using NgRx
 * @module AuthModule
 */

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginCredentials, SignUpCredentials, User } from './auth.types';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login Request': props<{ credentials: LoginCredentials }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    'Signup Request': props<{ credentials: SignUpCredentials }>(),
    'Signup Success': props<{ user: User }>(),
    'Signup Failure': props<{ error: string }>(),
    Logout: emptyProps(),
  },
});
