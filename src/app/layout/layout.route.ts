// layout/layout.routes.ts

// Angular Core imports
import { Routes } from '@angular/router';

// Core Guards imports
import { authGuard } from '@app/core/guards/auth.guard';

// Layout Components imports
import { MainComponent } from './main/main.component';
import { ErrorComponent } from '@layout/error/error.component';

// Shared Components imports
import { WelcomeComponent } from '@app/shared/pages/welcome/welcome.component';
import { AboutComponent } from '@app/shared/pages/about/about.component';

// Demo Components imports
import { DemoModalComponent } from '@app/demo/demo-modal.component';
import { DemoComponent } from '@app/demo/demo.component';
import { DemoTooltipComponent } from '@app/demo/tooltip-demo.component';
import { MYRCurrencyComponent } from '@app/demo/myr-currency.component';
import { MemoizationDemonstrationComponent } from '@app/demo/memoization-demo.component';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: MainComponent, // This is your main layout component
    children: [
      {
        path: '',
        component: WelcomeComponent,
        title: 'Home',
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'About',
      },
      { path: 'demo', component: DemoModalComponent, title: 'Demo Modal' },
      { path: 'demo-modal', component: DemoComponent, title: 'Demo' },
      {
        path: 'demo-tooltip',
        component: DemoTooltipComponent,
        title: 'Demo Tooltip',
      },
      {
        path: 'demo-myr-currency',
        component: MYRCurrencyComponent,
        title: 'Demo',
      },
      {
        path: 'memoization-demo',
        component: MemoizationDemonstrationComponent,
        title: 'Demo',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@features/dashboard/dashboard1.component').then(
            (m) => m.DashboardComponent
          ),
        title: 'Dashboard',
        canActivate: [authGuard],
      },
      {
        path: 'budget',
        loadComponent: () =>
          import('@features/budget/budget1.component').then(
            (m) => m.BudgetComponent
          ),
        title: 'Budget Overview',
      },
      {
        path: 'transaction',
        loadComponent: () =>
          import('@app/features/transactions/transaction.component').then(
            (m) => m.TransactionComponent
          ),
        title: 'Transaction',
      },
      // ... other main content routes
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../features/auth/login/login.routes').then((m) => m.loginRoutes),
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
];
