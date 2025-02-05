/**
 * @file http2.interceptor.ts
 * @module app/core/interceptors
 * @description HTTP interceptor that standardizes request headers and enriches request bodies
 *
 * @remarks
 * A traditional class-based HTTP interceptor providing:
 * - Standardized header management (Content-Type, Accept, API-Version)
 * - Request body enrichment with timestamps
 * - Consistent request transformation across the application
 *
 * Key features:
 * - Automatically sets required HTTP headers for JSON communication
 * - Adds timestamp to all non-empty request bodies
 * - Maintains request immutability through cloning
 *
 * Integration notes:
 * - Must be provided in the application's core module
 * - Operates on all HTTP requests made through HttpClient
 * - Requires Angular's HttpClientModule
 *
 * @injectable {root}
 *
 * @example
 * Basic module setup:
 * ```typescript
 * @NgModule({
 *   providers: [
 *     {
 *       provide: HTTP_INTERCEPTORS,
 *       useClass: CustomHttpInterceptor,
 *       multi: true
 *     }
 *   ]
 * })
 * export class CoreModule { }
 * ```
 *
 * The interceptor automatically transforms requests:
 * ```typescript
 * // Original request
 * http.post('/api/data', { value: 123 });
 *
 * // Transformed request
 * // Headers: Content-Type: application/json, Accept: application/json, API-Version: 1.0
 * // Body: { value: 123, timestamp: "2023-..." }
 * ```
 */

// Class-based Interceptor (Traditional)
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Transform request
    const transformedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'API-Version': '1.0',
      },
      body: this.transformRequestBody(request.body),
    });

    return next.handle(transformedRequest);
  }

  private transformRequestBody(body: any): any {
    if (!body) return body;
    // Implement custom transformation logic
    return {
      ...body,
      timestamp: new Date().toISOString(),
    };
  }
}
