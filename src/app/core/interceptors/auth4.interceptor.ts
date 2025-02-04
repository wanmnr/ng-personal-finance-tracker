/**
 * @file auth4.interceptor.ts
 * @description Angular HTTP interceptor that:
 * - Retrieves authentication token from localStorage
 * - Adds Bearer token to request headers if token exists
 * - Forwards original request if no token is found
 * - Ensures secure API communication by automatically handling token-based authentication
 * @module Interceptor
 */

import {
  HttpHandlerFn,
  HttpRequest,
  HttpInterceptorFn,
} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const token = localStorage.getItem('token');

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedReq);
  }

  return next(req);
};
