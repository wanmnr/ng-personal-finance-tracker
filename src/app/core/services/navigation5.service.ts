// app/core/services/navigation5.service.ts
// Navigation Guard Integration Approach
import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, map, filter } from 'rxjs';

interface NavigationGuardConfig {
  path: string;
  guards: CanActivate[];
  data?: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly router = inject(Router);

  private readonly sidenavState = new BehaviorSubject<boolean>(false);
  private readonly guardedRoutes = new Map<string, NavigationGuardConfig>();
  private readonly lastAllowedRoute = new BehaviorSubject<string>('/');
  private readonly navigationBlocked = new BehaviorSubject<boolean>(false);

  constructor() {
    this.initializeNavigationGuardListener();
  }

  private initializeNavigationGuardListener(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.lastAllowedRoute.next(event.urlAfterRedirects);
      this.navigationBlocked.next(false);
    });
  }

  registerGuardedRoute(config: NavigationGuardConfig): void {
    this.guardedRoutes.set(config.path, config);
  }

  async canNavigateTo(path: string): Promise<boolean> {
    const config = this.guardedRoutes.get(path);
    if (!config) return true;

    const routeSnapshot = new ActivatedRouteSnapshot();
    routeSnapshot.data = config.data || {};

    for (const guard of config.guards) {
      const canActivate = await Promise.resolve(
        guard.canActivate(routeSnapshot, this.router.routerState.snapshot)
      );

      if (!canActivate) {
        this.navigationBlocked.next(true);
        return false;
      }
    }

    return true;
  }

  async navigateTo(path: string, options: {
    queryParams?: Record<string, any>,
    state?: any,
    skipGuards?: boolean
  } = {}): Promise<boolean> {
    if (!options.skipGuards) {
      const canNavigate = await this.canNavigateTo(path);
      if (!canNavigate) {
        return false;
      }
    }

    return this.router.navigate([path], {
      queryParams: options.queryParams,
      state: options.state
    });
  }

  getLastAllowedRoute(): Observable<string> {
    return this.lastAllowedRoute.asObservable();
  }

  isNavigationBlocked(): Observable<boolean> {
    return this.navigationBlocked.asObservable();
  }

  toggleSidenav(): void {
    this.sidenavState.next(!this.sidenavState.value);
  }

  getSidenavState(): Observable<boolean> {
    return this.sidenavState.asObservable();
  }

  getGuardedRoutes(): Map<string, NavigationGuardConfig> {
    return new Map(this.guardedRoutes);
  }

  clearGuardedRoutes(): void {
    this.guardedRoutes.clear();
  }

  removeGuardedRoute(path: string): boolean {
    return this.guardedRoutes.delete(path);
  }

  hasGuards(path: string): boolean {
    return this.guardedRoutes.has(path);
  }

  getRouteGuards(path: string): CanActivate[] | undefined {
    return this.guardedRoutes.get(path)?.guards;
  }
}
