// app.routes.ts
import { Routes } from '@angular/router';

import { WelcomeComponent } from './shared/pages/welcome/welcome.component';
import { AboutComponent } from './shared/pages/about/about.component';
import { DemoComponent } from './demo/demo.component';
import { MemoizationDemonstrationComponent } from './demo/memoization-demo.component';

// Define your routes here
export const routes: Routes = [
  { path: '', component: WelcomeComponent, title: 'Home' },
  { path: 'about', component: AboutComponent, title: 'About' },
  { path: 'demo', component: DemoComponent, title: 'Demo' },
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
  { path: '**', redirectTo: '' }
];
