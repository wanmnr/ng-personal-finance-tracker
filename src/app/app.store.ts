// app.store.ts
import { isDevMode } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { paginationReducer } from '@shared/store/reducers/pagination.reducer';

export const appStore = [
  provideStore({
    pagination: paginationReducer
  }),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
    trace: false,
    traceLimit: 75,
  })
];
