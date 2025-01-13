// app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { permissionsGuard } from './core/guards/permissions.guard';
// import { Permissions } from '@core/guards/permissions.guard';
import { TransactionFormComponent } from '@features/transactions/transaction-form/transaction-form.component';
import { unsavedChangesGuard } from '@core/guards/unsaved-changes.guard';

import { WelcomeComponent } from './shared/pages/welcome/welcome.component';
import { AboutComponent } from './shared/pages/about/about.component';
import { DemoComponent } from './demo/demo.component';
import { MemoizationDemonstrationComponent } from './demo/memoization-demo.component';
import { DemoModalComponent } from './demo/demo-modal.component';
import { DemoTooltipComponent } from './demo/tooltip-demo.component';
import { MYRCurrencyComponent } from './demo/myr-currency.component';

// Define your routes here
export const routes: Routes = [
  { path: '', component: WelcomeComponent, title: 'Home' },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'demo', component: DemoModalComponent, title: 'Demo Modal' },
  { path: 'demo-modal', component: DemoComponent, title: 'Demo' },
  {
    path: 'demo-tooltip',
    component: DemoTooltipComponent,
    title: 'Demo Tooltip',
  },
  { path: 'demo-myr-currency', component: MYRCurrencyComponent, title: 'Demo' },
  {
    path: 'memoization-demo',
    component: MemoizationDemonstrationComponent,
    title: 'Demo',
  },
  {
    path: 'budget',
    loadComponent: () =>
      import('./features/budget/budget1.component').then(
        (m) => m.BudgetComponent
      ),
    title: 'Budget Overview',
  },
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

  {
    path: 'transaction/new',
    component: TransactionFormComponent,
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: 'transaction/edit/:id',
    component: TransactionFormComponent,
    canDeactivate: [unsavedChangesGuard],
  },

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
