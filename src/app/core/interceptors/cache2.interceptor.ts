/**
 * @file cache2.interceptor.ts
 * @description Class-based HTTP cache interceptor that:
 * - Provides a reusable caching mechanism for HTTP GET requests
 * - Maintains an in-memory cache using Map to store responses
 * - Serves cached responses when available to reduce server load
 * - Automatically caches new GET responses for subsequent requests
 * - Implements Angular's HttpInterceptor interface for seamless integration
 * @module Interceptor
 */

// Traditional Class-Based Interceptor
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Only cache GET requests
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse = this.cache.get(request.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cache.set(request.url, event);
        }
      })
    );
  }
}
