// src/app/core/permissions/permission.service.ts

import { Injectable } from '@angular/core';
import { Permission } from '@core/types/permission.types';
import {
  FREE_USER_PERMISSIONS,
  PREMIUM_USER_PERMISSIONS,
  ADMIN_PERMISSIONS,
} from '@core/types/permission-sets.types';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private userPermissions: Permission[] = [];

  setUserPermissions(userType: 'FREE' | 'PREMIUM' | 'ADMIN') {
    switch (userType) {
      case 'FREE':
        this.userPermissions = FREE_USER_PERMISSIONS;
        break;
      case 'PREMIUM':
        this.userPermissions = PREMIUM_USER_PERMISSIONS;
        break;
      case 'ADMIN':
        this.userPermissions = ADMIN_PERMISSIONS;
        break;
      default:
        this.userPermissions = [];
    }
  }

  hasPermission(permission: Permission): boolean {
    return this.userPermissions.includes(permission);
  }

  hasPermissions(permissions: Permission[]): boolean {
    return permissions.every((permission) => this.hasPermission(permission));
  }

  getUserPermissions(): Permission[] {
    return [...this.userPermissions];
  }
}
