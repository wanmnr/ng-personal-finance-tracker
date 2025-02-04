/**
 * @file cache.interceptor.ts
 * @description HTTP cache interceptor that:
 * - Implements a simple in-memory caching mechanism for GET requests
 * - Stores HTTP responses in a Map using the request URL as key
 * - Returns cached responses if available, avoiding redundant server calls
 * - Caches new responses automatically for future requests
 * - Improves application performance by reducing server load
 * @module Interceptor
 */

// Functional Interceptor (New in Angular 18)
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

// Cache store outside the interceptor function
const cache = new Map<string, any>();

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next(req);
  }

  const cachedResponse = cache.get(req.url);
  if (cachedResponse) {
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(req.url, event);
      }
    })
  );
};
