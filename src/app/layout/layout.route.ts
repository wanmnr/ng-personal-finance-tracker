// layout/layout.routes.ts
import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ErrorComponent } from '@layout/error/error.component';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'welcome',
        loadChildren: () =>
          import('@shared/pages/welcome/welcome.component').then(
            (m) => m.WelcomeComponent
          ),
      }
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('@features/auth/login/login.routes').then((m) => m.loginRoutes),
      }
    ],
  },
  {
    path: 'error',
    component: ErrorComponent
  }
];
