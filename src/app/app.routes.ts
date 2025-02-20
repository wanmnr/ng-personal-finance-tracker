/**
 * @file app.routes.ts
 * @module AppRouting
 * @description Defines the application's route configuration.
 */

// Angular Core imports
import { Routes } from '@angular/router';

// Core Guards imports
import { authGuard } from '@core/guards/auth.guard';
import { permissionsGuard } from '@core/guards/permissions.guard';
import { unsavedChangesGuard } from '@core/guards/unsaved-changes.guard';
// import { Permissions } from '@core/guards/permissions.guard';

// Routes Configuration imports
import { layoutRoutes } from '@layout/layout.route';

/**
 * Application-wide route definitions.
 */
export const routes: Routes = [
  /**
   * Main application routes with layout.
   */
  {
    path: '',
    children: layoutRoutes,
  },

  /**
   * Public authentication routes without layout.
   */
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@layout/layout.route').then((m) => m.layoutRoutes),
      },
    ],
  },
  /**
   * Budget feature module.
   */
  {
    path: 'budget',
    loadComponent: () =>
      import('./features/budget/budget1.component').then(
        (m) => m.BudgetComponent
      ),
    title: 'Budget Overview',
  },
  /**
   * Dashboard feature module.
   */
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard1.component').then(
        (m) => m.DashboardComponent
      ),
    title: 'Dashboard',
    // canActivate: [authGuard]  // Only basic access
  },
  // {
  //   path: 'transactions',
  //   component: TransactionsPageComponent,
  //   canActivate: [authGuard],
  //   title: 'Transactions'
  // }

  // Alternatively, if you want to use lazy loading:
  /*
  {
    path: 'transactions',
    loadChildren: () => import('./features/transactions/transactions.module').then(m => m.TransactionsModule),
    canActivate: [authGuard],
    title: 'Transactions'
  }
  */

  /**
   * Transaction feature module with lazy loading.
   */
  {
    path: 'transaction',
    loadChildren: () =>
      import('@features/transactions/transaction.component').then(
        (m) => m.TransactionComponent
      ),
  },
  // {
  //   path: 'transactions',
  //   loadChildren: () =>
  //     import('./features/transactions/transactions.routes')
  //       .then(m => m.TRANSACTION_ROUTES),
  //   canActivate: [authGuard, permissionsGuard],
  //   data: {
  //     permissions: [Permissions.VIEW_TRANSACTIONS]
  //   }
  // },

  // {
  //   path: 'budgets',
  //   loadChildren: () =>
  //     import('./features/budgets/budgets.routes')
  //       .then(m => m.BUDGET_ROUTES),
  //   canActivate: [authGuard, permissionsGuard],
  //   data: {
  //     permissions: [Permissions.VIEW_BUDGETS]
  //   }
  // }

  /**
   * Fallback route redirects to home.
   */
  { path: '**', redirectTo: '' },
];

// export const routes: Routes = [
//   {
//     path: '',
//     pathMatch: 'full',
//     redirectTo: 'dashboard'
//   },
//   {
//     path: 'auth',
//     loadChildren: () =>
//       import('./features/auth/auth.routes')
//         .then(m => m.AUTH_ROUTES)
//   },
//   {
//     path: 'dashboard',
//     loadComponent: () =>
//       import('./features/dashboard/dashboard.component')
//         .then(m => m.DashboardComponent),
//     canActivate: [authGuard]
//   },
//   {
//     path: 'transactions',
//     loadChildren: () =>
//       import('./features/transactions/transactions.routes')
//         .then(m => m.TRANSACTION_ROUTES),
//     canActivate: [authGuard]
//   },
//   {
//     path: 'budgets',
//     loadChildren: () =>
//       import('./features/budgets/budgets.routes')
//         .then(m => m.BUDGET_ROUTES),
//     canActivate: [authGuard]
//   },
//   {
//     path: 'reports',
//     loadChildren: () =>
//       import('@features/reports/reports.routes')
//         .then(m => m.REPORT_ROUTES),
//     canActivate: [authGuard]
//   },
//   {
//     path: '**',
//     loadComponent: () =>
//       import('./shared/components/not-found/not-found.component')
//         .then(m => m.NotFoundComponent)
//   }
// ];
