// app.routes.ts
import { Routes } from '@angular/router';

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
  { path: 'demo-tooltip', component: DemoTooltipComponent, title: 'Demo Tooltip' },
  { path: 'demo-myr-currency', component: MYRCurrencyComponent, title: 'Demo' },
  { path: 'memoization-demo', component: MemoizationDemonstrationComponent, title: 'Demo' },
  {
    path: 'budget',
    loadComponent: () => import('./features/budget/budget1.component')
      .then(m => m.BudgetComponent),
    title: 'Budget Overview'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard1.component')
      .then(m => m.DashboardComponent),
    title: 'Dashboard'
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
  { path: '**', redirectTo: '' }
];
