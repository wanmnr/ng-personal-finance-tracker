// auth2.guard.ts

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  // Use store selectors to check auth state
  return true;
};




