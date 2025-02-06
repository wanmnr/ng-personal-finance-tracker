/**
 * @file loading.interceptor.ts
 * @description HTTP interceptor that manages application-wide loading state with request counting.
 * It tracks concurrent HTTP requests using a counter and shows loading indicator only when active
 * requests exist. The loading state is handled through LoadingService, ensuring the loading
 * indicator remains visible until all active requests complete.
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
import { finalize } from 'rxjs/operators';
import { LoadingService } from '@core/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.activeRequests === 0) {
      this.loadingService.setLoading(true);
    }
    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
