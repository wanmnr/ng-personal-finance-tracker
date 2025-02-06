/**
 * @file timeout.interceptor.ts
 * @description HTTP interceptor that enforces request timeouts and cancellation handling. It sets
 * a 30-second timeout for all HTTP requests and integrates with CancelService to allow manual
 * request cancellation. This helps prevent hanging requests and provides request cancellation
 * capability across the application.
 * @module Interceptor
 */

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, takeUntil } from 'rxjs/operators';
import { CancelService } from '@core/services/cancel.service';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {
  constructor(private cancelService: CancelService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      timeout(30000), // 30 second timeout
      takeUntil(this.cancelService.cancelRequest$)
    );
  }
}
