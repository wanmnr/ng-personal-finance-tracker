// features/auth/login/login.routes.ts

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
    ]
  }
];
