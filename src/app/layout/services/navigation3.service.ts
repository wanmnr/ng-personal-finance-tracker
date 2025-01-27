// layout/services/navigation3.service.ts
// Permission-Based Navigation Approach
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface NavigationItem {
  label: string;
  path: string;
  icon?: any;
  requiredPermissions?: string[];
  children?: NavigationItem[];
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly router = inject(Router);

  private readonly sidenavState = new BehaviorSubject<boolean>(false);
  private readonly userPermissions = new BehaviorSubject<string[]>([]);
  private readonly navigationItems = new BehaviorSubject<NavigationItem[]>([]);

  constructor() {
    this.initializeNavigationItems();
  }

  private initializeNavigationItems(): void {
    const items: NavigationItem[] = [
      {
        label: 'Dashboard',
        path: '/dashboard',
        requiredPermissions: ['view_dashboard'],
      },
      {
        label: 'Projects',
        path: '/projects',
        requiredPermissions: ['view_projects'],
        children: [
          {
            label: 'Create Project',
            path: '/projects/create',
            requiredPermissions: ['create_project'],
          },
        ],
      },
    ];
    this.navigationItems.next(items);
  }

  setUserPermissions(permissions: string[]): void {
    this.userPermissions.next(permissions);
  }

  getAccessibleNavigationItems(): Observable<NavigationItem[]> {
    return new Observable<NavigationItem[]>((observer) => {
      this.userPermissions.subscribe((permissions) => {
        const filteredItems = this.filterNavigationItems(
          this.navigationItems.value,
          permissions
        );
        observer.next(filteredItems);
      });
    });
  }

  private filterNavigationItems(
    items: NavigationItem[],
    permissions: string[]
  ): NavigationItem[] {
    return items.filter((item) => {
      const hasPermission =
        !item.requiredPermissions ||
        item.requiredPermissions.every((permission) =>
          permissions.includes(permission)
        );

      if (hasPermission && item.children) {
        item.children = this.filterNavigationItems(item.children, permissions);
      }

      return hasPermission;
    });
  }

  toggleSidenav(): void {
    this.sidenavState.next(!this.sidenavState.value);
  }

  getSidenavState(): Observable<boolean> {
    return this.sidenavState.asObservable();
  }

  hasPermission(permission: string): boolean {
    return this.userPermissions.value.includes(permission);
  }

  navigateToAuthorizedRoute(path: string): void {
    const item = this.findNavigationItem(this.navigationItems.value, path);

    if (item && this.canAccessRoute(item)) {
      this.router.navigate([path]);
    } else {
      this.router.navigate(['/unauthorized']);
    }
  }

  private findNavigationItem(
    items: NavigationItem[],
    path: string
  ): NavigationItem | null {
    for (const item of items) {
      if (item.path === path) return item;
      if (item.children) {
        const found = this.findNavigationItem(item.children, path);
        if (found) return found;
      }
    }
    return null;
  }

  private canAccessRoute(item: NavigationItem): boolean {
    return (
      !item.requiredPermissions ||
      item.requiredPermissions.every((permission) =>
        this.hasPermission(permission)
      )
    );
  }
}
