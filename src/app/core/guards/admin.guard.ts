/**
 * @file admin.guard.ts
 * @description Angular route guard that implements role-based access control for admin routes.
 * It performs multi-layer authentication and authorization checks by:
 * 1. Verifying user authentication status
 * 2. Checking local admin privileges
 * 3. Validating admin role with the server
 * 4. Refreshing user profile on successful validation
 * If any check fails, redirects to login or unauthorized pages accordingly.
 * @module Guard
 */

/*
 * Role-specific check
 * - Verifies if user has admin privileges
 * - More specific access control
 * - Used for admin-only routes
 */
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/auth.service';
import { UserService } from '../services/user.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../models/user.model';

export const adminGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const userService = inject(UserService);

  // First check if user is authenticated
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // Check local admin status first
  if (authService.isAdmin()) {
    return true;
  }

  // Double-check with server (optional but recommended)
  const currentUser = authService.getCurrentUser();
  if (!currentUser) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return userService.validateUserRole(currentUser.id, 'admin').pipe(
    map((isAdmin) => {
      if (isAdmin) {
        // Refresh the user profile
        userService.getUserProfile(currentUser.id).subscribe((profile) => {
          // Update the stored user data with the new profile
          const updatedUser: User = {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            roles: profile.roles,
          };
          authService.updateStoredUser(updatedUser);
        });
        return true;
      }
      router.navigate(['/unauthorized']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/unauthorized']);
      return of(false);
    })
  );
};
