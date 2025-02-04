/**
 * @file auth.guard.ts
 * @description Angular route guard that provides basic authentication protection for routes.
 * Implements a straightforward authentication check to ensure users are logged in before
 * accessing protected routes. If authentication check fails, automatically redirects
 * unauthenticated users to the login page. This guard serves as a fundamental security
 * layer for routes requiring user authentication without specific role requirements.
 * @module Guard
 */

/*
 * Basic authentication check
 * - Verifies if user is logged in
 * - Protects routes that require any authentication
 * - Used for general authenticated routes
 */
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.navigate(['/login']);
};
