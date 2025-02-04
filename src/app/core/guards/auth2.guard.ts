/**
 * @file auth2.guard.ts
 * @description Angular route guard implementing Firebase authentication with session management.
 * Provides multi-layered authentication verification including:
 * 1. Firebase user authentication status
 * 2. Email verification check
 * 3. Session timeout management (30-minute duration)
 * The guard automatically redirects to appropriate routes based on authentication state:
 * - Unauthenticated users to login
 * - Unverified emails to verification page
 * - Expired sessions to login
 * Implements activity tracking to maintain session freshness through localStorage.
 * @module Guard
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { map, Observable, take } from 'rxjs';

export const AUTH_TIMEOUT_DURATION = 30 * 60 * 1000; // 30 minutes

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    take(1),
    map((user) => {
      if (!user) {
        return router.createUrlTree(['/auth/login']);
      }

      if (!user.emailVerified) {
        return router.createUrlTree(['/auth/verify-email']);
      }

      if (!isValidSession()) {
        return router.createUrlTree(['/auth/login']);
      }

      updateLastActivity();
      return true;
    })
  );
};

function isValidSession(): boolean {
  const lastActivity = localStorage.getItem('lastActivityTimestamp');
  if (!lastActivity) {
    return true;
  }

  const timeDiff = Date.now() - parseInt(lastActivity, 10);
  return timeDiff <= AUTH_TIMEOUT_DURATION;
}

function updateLastActivity(): void {
  localStorage.setItem('lastActivityTimestamp', Date.now().toString());
}
