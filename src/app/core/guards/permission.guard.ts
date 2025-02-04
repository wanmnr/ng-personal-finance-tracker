/**
 * @file permission.guard.ts
 * @description Route guard that enforces permission-based access control by validating user permissions
 * against route requirements. Redirects unauthorized users to an error page when permission checks fail.
 * Supports multiple permission requirements defined in route data configuration.
 * @module Guard
 */

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { PermissionService } from '@core/services/permission.service';
import { Permission } from '@core/types/permission.types';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(
    private permissionService: PermissionService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiredPermissions = route.data['permissions'] as Permission[];

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    if (this.permissionService.hasPermissions(requiredPermissions)) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
