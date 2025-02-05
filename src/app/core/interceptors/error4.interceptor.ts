/**
 * @file error4.interceptor.ts
 * @module Core/Interceptors/Error
 * @description Centralized HTTP error handler with status code management and user notifications
 *
 * @remarks
 * Key Features:
 * - Authentication error handling (401)
 * - Permission validation (403)
 * - Resource not found handling (404)
 * - Validation error processing (400)
 * - Server error management (500)
 * - Default error fallback
 *
 * Integration Points:
 * - Requires registration in app.module.ts providers array
 * - Depends on Router for navigation
 * - Utilizes ToastrService for notifications
 *
 * Behavioral Notes:
 * - Automatically redirects to login page on authentication errors
 * - Processes nested validation errors from API responses
 * - Preserves error state during server error navigation
 * - Logs unexpected errors to console
 *
 * @example
 * Register in AppModule:
 * ```typescript
 * @NgModule({
 *   providers: [
 *     {
 *       provide: HTTP_INTERCEPTORS,
 *       useClass: ErrorInterceptor,
 *       multi: true
 *     }
 *   ]
 * })
 * ```
 *
 * @example
 * HTTP request handling:
 * ```typescript
 * this.http.get('/api/protected-resource').subscribe({
 *   next: (response) => console.log(response),
 *   error: (error) => {
 *     // Error already handled by interceptor
 *     // Additional error handling if needed
 *   }
 * });
 * ```
 *
 * @injectable Provided in 'root'
 */

// Traditional Class-Based Interceptor for NgModule Approach
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.toastr.error('Please login to continue');
            this.router.navigate(['/login']);
            break;

          case 403:
            this.toastr.error(
              'You do not have permission to perform this action',
            );
            break;

          case 404:
            this.toastr.error('Resource not found');
            this.router.navigate(['/not-found']);
            break;

          case 400:
            if (error.error?.errors) {
              const modelStateErrors = [];
              for (const key in error.error.errors) {
                modelStateErrors.push(error.error.errors[key]);
              }
              throw modelStateErrors.flat();
            } else {
              this.toastr.error(error.error?.message || 'Bad Request');
            }
            break;

          case 500:
            this.toastr.error('Internal server error');
            this.router.navigate(['/server-error'], {
              state: { error: error.error },
            });
            break;

          default:
            this.toastr.error('Something unexpected went wrong');
            console.error('An error occurred:', error);
            break;
        }
        return throwError(() => error);
      }),
    );
  }
}
