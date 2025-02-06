/**
 * @file logging.interceptor.ts
 * @description HTTP interceptor that provides detailed request and response logging for debugging
 * and monitoring purposes. It logs HTTP method, URL, request duration, headers, and response body
 * for each completed HTTP request. Measures request duration using timestamp differences to track
 * performance metrics.
 * @module Interceptor
 */

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const startTime = Date.now();

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const duration = Date.now() - startTime;
          console.log(
            `${request.method} ${request.url} completed in ${duration}ms`
          );
          console.log('Request Headers:', request.headers);
          console.log('Response Headers:', event.headers);
          console.log('Response Body:', event.body);
        }
      })
    );
  }
}
