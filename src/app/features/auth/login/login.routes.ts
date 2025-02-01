/**
 * @file login.routes.ts
 * @description Route configuration for login-related features including forgot password and reset password
 * @module AuthModule
 */

import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';

export const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      // Add any nested login-related routes here
      // {
      //   path: 'forgot-password',
      //   loadComponent: () =>
      //     import('./forgot-password.component').then(
      //       (m) => m.ForgotPasswordComponent
      //     )
      // },
      // {
      //   path: 'reset-password',
      //   loadComponent: () =>
      //     import('./reset-password.component').then(
      //       (m) => m.ResetPasswordComponent
      //     )
      // }
    ],
  },
];
