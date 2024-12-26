// auth.guard.ts
/*
 * Basic authentication check
 * - Verifies if user is logged in
 * - Protects routes that require any authentication
 * - Used for general authenticated routes
 */
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    return true;
  }

  return router.navigate(['/login']);
};
