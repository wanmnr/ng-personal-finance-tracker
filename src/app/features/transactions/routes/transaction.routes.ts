// routes/transaction.routes.ts
import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { transactionFeature } from '../store/transaction.feature';
import { TransactionEffects } from '../store/transaction.effects';

export const TRANSACTION_ROUTES: Routes = [
  {
    path: '',
    component: TransactionListComponent,
    providers: [
      provideState(transactionFeature),
      provideEffects(TransactionEffects),
    ],
  },
];
