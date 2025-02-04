/**
 * @file auth3.interceptor.ts
 * @description Implements HTTP request interception for authentication
 * by automatically adding Bearer tokens to outgoing requests when a user is authenticated.
 * This interceptor checks the authentication state and appends the authorization header
 * with the user's token before forwarding the request.
 * @module Interceptor
 */

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@features/auth/auth.service';
import { TokenService } from '../services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    const authToken = tokenService.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
    return next(authReq);
  }

  return next(req);
};
