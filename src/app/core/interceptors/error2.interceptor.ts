/**
 * @file error2.interceptor.ts
 * @description Class-based HTTP error interceptor that:
 * - Provides centralized error handling for all HTTP requests
 * - Uses Material Snackbar to display user-friendly error notifications
 * - Handles common HTTP error scenarios (401, 404)
 * - Shows appropriate error messages based on response status
 * - Implements Angular's HttpInterceptor interface for systematic error management
 * @module Interceptor
 */

// Traditional Class-Based Interceptor
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.snackBar.open('Unauthorized access', 'Close', {
            duration: 3000,
          });
        } else if (error.status === 404) {
          this.snackBar.open('Resource not found', 'Close', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('An error occurred', 'Close', {
            duration: 3000,
          });
        }
        return throwError(() => error);
      })
    );
  }
}
