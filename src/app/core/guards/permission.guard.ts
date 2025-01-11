// src/app/core/permissions/permission.guard.ts

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
