/**
 * @file http.interceptor.ts
 * @module Core/Interceptors
 * @description Standardizes HTTP request headers across the application
 *
 * @remarks
 * Implements Angular 18's functional interceptor pattern to add standardized headers
 * to all outgoing HTTP requests. Currently sets JSON content type and API version headers.
 *
 * @version 1.0.0
 * @since Angular 18.0.0
 *
 * @example
 * ```typescript
 * // In app.config.ts
 * import { provideHttpClient, withInterceptors } from '@angular/common/http';
 * import { simpleHttpInterceptor } from './http.interceptor';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(withInterceptors([simpleHttpInterceptor]))
 *   ]
 * };
 * ```
 */

// Functional Interceptor (New in Angular 18)
import { HttpInterceptorFn } from '@angular/common/http';

export const simpleHttpInterceptor: HttpInterceptorFn = (request, next) => {
  const transformedRequest = request.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'API-Version': '1.0',
    },
  });
  return next(transformedRequest);
};
