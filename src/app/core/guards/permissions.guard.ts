/**
 * @file permissions.guard.ts
 * @description Angular route guard that validates user permissions
 * against route-specific requirements, enforcing access control
 * by redirecting unauthorized users and ensuring authenticated users
 * have sufficient permissions to access protected routes.
 * @module Guard
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { Observable, map, take, switchMap, of } from 'rxjs';
import { UserService } from '@core/services/user1.service';
import { checkPermissions } from '@core/utils/permission.utils';

export const permissionsGuard: CanActivateFn = (
  route
): Observable<boolean | UrlTree> => {
  const auth = inject(Auth);
  const router = inject(Router);
  const userService = inject(UserService);

  const requiredPermissions = route.data?.['permissions'] as string[];

  return authState(auth).pipe(
    take(1),
    switchMap((user) => {
      if (!user) {
        return of(router.createUrlTree(['/auth/login']));
      }
      return userService.getUserPermissions(user.uid).pipe(
        map((userPermissions) => {
          if (!userPermissions) {
            return router.createUrlTree(['/unauthorized']);
          }

          return checkPermissions(userPermissions, requiredPermissions)
            ? true
            : router.createUrlTree(['/unauthorized']);
        })
      );
    })
  );
};
