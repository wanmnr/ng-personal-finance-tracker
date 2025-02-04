/**
 * @file auth.interceptor.ts
 * @description HTTP interceptor that handles authentication, authorization, and request/response processing.
 * Manages token-based authentication, adds security headers, handles CORS, implements request timing,
 * processes 401 unauthorized errors with token refresh, and provides request logging. Supports test
 * environment bypassing and cross-origin request handling while maintaining secure communication between
 * client and server.
 * @module Interceptor
 */

// Functional Interceptor (New in Angular 18)
import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap, finalize } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AuthService } from '@features/auth/auth.service';
import { TokenService } from '../services/token.service';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);

  // Start timing for request monitoring
  const startTime = Date.now();
  let statusCode: number;

  // Skip interception for test endpoints
  if (request.url.includes('/test-api/')) {
    return next(request);
  }

  // Handle the main request
  const modifiedRequest = addHeaders(request, tokenService);

  return next(modifiedRequest).pipe(
    // Monitor responses
    tap(
      (event) => {
        if (event instanceof HttpResponse) {
          statusCode = event.status;
        }
      },
      (error) => {
        statusCode = error.status;
        console.error('Request Error:', error);
      }
    ),

    // Error handling
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handle401Error(request, next, authService);
      }
      return throwError(() => error);
    }),

    // Request logging
    finalize(() => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      console.log(
        `${request.method} ${request.url} ${statusCode} took ${duration}ms`
      );
    })
  );
};

function addHeaders(
  request: HttpRequest<unknown>,
  tokenService: TokenService
): HttpRequest<unknown> {
  const token = getToken(tokenService);
  const headers: { [key: string]: string } = {
    'X-Environment': environment.production ? 'prod' : 'test',
  };

  // Add CSRF token if available
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    headers['X-CSRF-TOKEN'] = csrfToken;
  }

  // Add authorization token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Add CORS headers for cross-origin requests
  if (isCrossOriginRequest(request)) {
    headers['Access-Control-Allow-Origin'] =
      environment.allowedOrigins.join(',');
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
  }

  return request.clone({
    setHeaders: headers,
  });
}

function getToken(tokenService: TokenService): string {
  return environment.production ? tokenService.getToken() || '' : 'test-token';
}

function getCsrfToken(): string {
  return (
    document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content') || ''
  );
}

function handle401Error(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<unknown>> {
  return authService.refreshToken().pipe(
    switchMap(() => {
      return next(addHeaders(request, inject(TokenService)));
    }),
    catchError((refreshError) => {
      authService.logout();
      return throwError(() => refreshError);
    })
  );
}

function isCrossOriginRequest(request: HttpRequest<unknown>): boolean {
  const currentOrigin = window.location.origin;
  const requestOrigin = new URL(request.url).origin;
  return currentOrigin !== requestOrigin;
}
