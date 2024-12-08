// app/core/services/navigation.service.ts
import { Injectable, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface NavigationState {
  breadcrumbs: string[];
  currentRoute: string;
  previousRoute: string | null;
  permissions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly navigationState = signal<NavigationState>({
    breadcrumbs: [],
    currentRoute: '',
    previousRoute: null,
    permissions: []
  });

  constructor(private router: Router) {
    this.initializeRouteListener();
  }

  private initializeRouteListener(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateNavigationState(event.url);
      }
    });
  }

  private updateNavigationState(currentRoute: string): void {
    this.navigationState.update(state => ({
      ...state,
      previousRoute: state.currentRoute,
      currentRoute,
      breadcrumbs: this.generateBreadcrumbs(currentRoute)
    }));
  }

  private generateBreadcrumbs(route: string): string[] {
    return route
      .split('/')
      .filter(segment => segment)
      .map(segment => this.formatBreadcrumb(segment));
  }

  private formatBreadcrumb(segment: string): string {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  setBreadcrumbs(breadcrumbs: string[]): void {
    this.navigationState.update(state => ({
      ...state,
      breadcrumbs
    }));
  }

  setPermissions(permissions: string[]): void {
    this.navigationState.update(state => ({
      ...state,
      permissions
    }));
  }

  canNavigate(route: string): boolean {
    const requiredPermission = this.getRequiredPermission(route);
    return this.navigationState().permissions.includes(requiredPermission);
  }

  private getRequiredPermission(route: string): string {
    // Implementation to map routes to required permissions
    return `access:${route}`;
  }

  getNavigationState(): NavigationState {
    return this.navigationState();
  }

  getPreviousRoute(): string | null {
    return this.navigationState().previousRoute;
  }

  getBreadcrumbs(): string[] {
    return this.navigationState().breadcrumbs;
  }
}
