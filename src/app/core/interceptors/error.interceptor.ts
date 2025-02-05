/**
 * @file error.interceptor.ts
 * @description HTTP error handling interceptor that:
 * - Catches and processes HTTP request errors globally
 * - Displays user-friendly error messages using Material Snackbar
 * - Handles specific error cases (401 Unauthorized, 404 Not Found)
 * - Provides fallback error messaging for unexpected errors
 * - Maintains consistent error handling across the application
 * @module Interceptor
 */

// Functional Interceptor (New in Angular 18)
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        snackBar.open('Unauthorized access', 'Close', {
          duration: 3000,
        });
      } else if (error.status === 404) {
        snackBar.open('Resource not found', 'Close', {
          duration: 3000,
        });
      } else {
        snackBar.open('An error occurred', 'Close', {
          duration: 3000,
        });
      }
      return throwError(() => error);
    })
  );
};
