// store/index1.ts
// Basic Modular Approach:
import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { RootState } from './root-state.interface';

import { RootState } from './root-state.interface';
import * as fromProducts from '../features/products/store/reducers';
import * as fromOrders from '../features/orders/store/reducers';
import { ProductEffects } from '../features/products/store/effects';
import { OrderEffects } from '../features/orders/store/effects';

export const reducers: ActionReducerMap<RootState> = {
  products: fromProducts.reducer,
  orders: fromOrders.reducer
};

export const metaReducers: MetaReducer<RootState>[] = isDevMode() ? [] : [];

export const storeProviders = [
  provideStore(reducers, { metaReducers }),
  provideEffects([ProductEffects, OrderEffects]),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
    trace: false,
    traceLimit: 75
  })
];
