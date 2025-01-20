// features/transactions/transaction.routes.ts

import { Routes } from '@angular/router';
import { TransactionFormComponent } from '@app/features/transactions/transaction-form/transaction-form.component';
import { unsavedChangesGuard } from '@core/guards/unsaved-changes.guard';
import { TransactionComponent } from './transaction.component';

export const transactionRoutes: Routes = [
  {
    path: '',
    component: TransactionComponent,
    children: [
      // Add any nested transaction-related routes here
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
    ],
  },
];
