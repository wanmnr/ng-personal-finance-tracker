/**
 * @file loading-spinner.interceptor.ts
 * @description HTTP interceptor that integrates with ngx-spinner to provide global loading indication
 * during HTTP requests. It automatically shows a spinner when any HTTP request starts and hides it
 * upon completion. Works in conjunction with loading-spinner.service.ts and loading-spinner.component.ts
 * to provide a consistent loading experience across the application.
 * @module Interceptor
 */

// TODO: need to be integrate with loading-spinner.service.ts and loading-spinner.component.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next.handle(req).pipe(finalize(() => this.spinner.hide()));
  }
}
