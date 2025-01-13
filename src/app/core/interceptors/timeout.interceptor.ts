// src/app/core/interceptors/timeout.interceptor.ts
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
