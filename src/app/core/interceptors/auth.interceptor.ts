// core/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap, finalize } from 'rxjs/operators';
import { environment } from '@env/environment';
import { AuthService } from '@core/services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Start timing for request monitoring
    const startTime = Date.now();
    let statusCode: number;

    // Skip interception for test endpoints
    if (request.url.includes('/test-api/')) {
      return next.handle(request);
    }

    // Handle the main request
    const modifiedRequest = this.addHeaders(request);

    return next.handle(modifiedRequest).pipe(
      // Monitor responses
      tap(
        event => {
          if (event instanceof HttpResponse) {
            statusCode = event.status;
          }
        },
        error => {
          statusCode = error.status;
          console.error('Request Error:', error);
        }
      ),

      // Error handling
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      }),

      // Request logging
      finalize(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`${request.method} ${request.url} ${statusCode} took ${duration}ms`);
      })
    );
  }

  private addHeaders(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.getToken();
    const headers: { [key: string]: string } = {
      'X-Environment': environment.production ? 'prod' : 'test'
    };

    // Add CSRF token if available
    const csrfToken = this.getCsrfToken();
    if (csrfToken) {
      headers['X-CSRF-TOKEN'] = csrfToken;
    }

    // Add authorization token if available
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Add CORS headers for cross-origin requests
    if (this.isCrossOriginRequest(request)) {
      headers['Access-Control-Allow-Origin'] = environment.allowedOrigins.join(',');
      headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
      headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    }

    return request.clone({
      setHeaders: headers
    });
  }

  private getToken(): string {
    return environment.production
      ? (this.tokenService.getToken() || '')
      : 'test-token';
  }

  private getCsrfToken(): string {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refreshToken().pipe(
      switchMap(() => {
        return next.handle(this.addHeaders(request));
      }),
      catchError((refreshError) => {
        this.authService.logout();
        return throwError(() => refreshError);
      })
    );
  }

  private isCrossOriginRequest(request: HttpRequest<any>): boolean {
    const currentOrigin = window.location.origin;
    const requestOrigin = new URL(request.url).origin;
    return currentOrigin !== requestOrigin;
  }
}
