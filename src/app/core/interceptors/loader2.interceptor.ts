/**
 * @file loader2.interceptor.ts
 * @description HTTP interceptor that manages loading state during HTTP requests. It automatically
 * shows a loader when requests start and hides it when they complete, providing visual feedback
 * for asynchronous operations. Uses LoaderService to control the loading state.
 * @module Interceptor
 */

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  loaderService.show();

  return next(req).pipe(
    finalize(() => {
      loaderService.hide();
    })
  );
};
