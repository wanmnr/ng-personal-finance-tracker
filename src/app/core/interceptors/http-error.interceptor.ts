/**
 * @file http-error.interceptor.ts
 * @description Generic HTTP error interceptor that handles both client-side and server-side errors.
 * Implements automatic retry logic for failed requests (up to 2 attempts) and provides detailed
 * error message formatting. For client-side errors, it captures ErrorEvent details, while for
 * server-side errors, it includes both status code and error message. The interceptor logs errors
 * for debugging and can be extended to integrate with analytics services.
 * @module Interceptor
 */

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(2), // Retry failed requests up to 2 times
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Client Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        // Log error or send to analytics service
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
