// layout/services/navigation4.service.ts
// Navigation State History Management Approach
import { Injectable, inject, signal } from '@angular/core';
import { Router, NavigationEnd, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable, filter } from 'rxjs';

interface NavigationState {
  url: string;
  timestamp: number;
  params?: Params;
  queryParams?: Params;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  private navigationStack: NavigationState[] = [];
  private currentIndex = -1;
  private readonly maxStackSize = 100;

  private readonly sidenavState = signal<boolean>(false);
  private readonly canGoBack = signal<boolean>(false);
  private readonly canGoForward = signal<boolean>(false);

  private readonly currentState = new BehaviorSubject<NavigationState | null>(
    null
  );

  constructor() {
    this.initializeNavigationListener();
  }

  private initializeNavigationListener(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.handleNavigation(event);
      });
  }

  private handleNavigation(event: NavigationEnd): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state;
    const routeSnapshot = this.router.routerState.snapshot;

    const newState: NavigationState = {
      url: event.urlAfterRedirects,
      timestamp: Date.now(),
      params: routeSnapshot.root.firstChild?.params,
      queryParams: routeSnapshot.root.queryParams,
      data: state,
    };

    // Remove all states after current index if we're not at the end
    if (this.currentIndex < this.navigationStack.length - 1) {
      this.navigationStack = this.navigationStack.slice(
        0,
        this.currentIndex + 1
      );
    }

    // Add new state
    this.navigationStack.push(newState);
    this.currentIndex++;

    // Maintain max stack size
    if (this.navigationStack.length > this.maxStackSize) {
      this.navigationStack.shift();
      this.currentIndex--;
    }

    this.updateNavigationState();
  }

  private updateNavigationState(): void {
    this.canGoBack.set(this.currentIndex > 0);
    this.canGoForward.set(this.currentIndex < this.navigationStack.length - 1);
    this.currentState.next(this.navigationStack[this.currentIndex]);
  }

  goBack(): void {
    if (this.canGoBack()) {
      this.currentIndex--;
      const previousState = this.navigationStack[this.currentIndex];
      this.router.navigate([previousState.url], {
        state: previousState.data,
        queryParams: previousState.queryParams,
      });
    }
  }

  goForward(): void {
    if (this.canGoForward()) {
      this.currentIndex++;
      const nextState = this.navigationStack[this.currentIndex];
      this.router.navigate([nextState.url], {
        state: nextState.data,
        queryParams: nextState.queryParams,
      });
    }
  }

  getCurrentState(): Observable<NavigationState | null> {
    return this.currentState.asObservable();
  }

  getNavigationHistory(): NavigationState[] {
    return [...this.navigationStack];
  }

  canNavigateBack(): boolean {
    return this.canGoBack();
  }

  canNavigateForward(): boolean {
    return this.canGoForward();
  }

  clearHistory(): void {
    this.navigationStack = [this.navigationStack[this.currentIndex]];
    this.currentIndex = 0;
    this.updateNavigationState();
  }

  toggleSidenav(): void {
    this.sidenavState.update((state) => !state);
  }

  getSidenavState(): boolean {
    return this.sidenavState();
  }
}
