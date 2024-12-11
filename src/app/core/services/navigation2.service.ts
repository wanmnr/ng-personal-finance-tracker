// app/core/services/navigation2.service.ts
// Advanced Router Integration Approach
import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { Location } from '@angular/common';

interface NavigationHistoryEntry {
  url: string;
  timestamp: number;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  private readonly sidenavState = new BehaviorSubject<boolean>(false);
  private navigationHistory: NavigationHistoryEntry[] = [];
  private readonly currentRoute = new BehaviorSubject<string>('');
  private readonly maxHistoryLength = 50;

  constructor() {
    this.initializeRouterEvents();
  }

  private initializeRouterEvents(): void {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.addToHistory(event.urlAfterRedirects);
      this.currentRoute.next(event.urlAfterRedirects);
    });
  }

  private addToHistory(url: string): void {
    this.navigationHistory.push({
      url,
      timestamp: Date.now()
    });

    if (this.navigationHistory.length > this.maxHistoryLength) {
      this.navigationHistory.shift();
    }
  }

  toggleSidenav(): void {
    this.sidenavState.next(!this.sidenavState.value);
  }

  getSidenavState(): Observable<boolean> {
    return this.sidenavState.asObservable();
  }

  getCurrentRoute(): Observable<string> {
    return this.currentRoute.asObservable();
  }

  getNavigationHistory(): NavigationHistoryEntry[] {
    return [...this.navigationHistory];
  }

  navigateBack(): void {
    this.location.back();
  }

  navigateForward(): void {
    this.location.forward();
  }

  navigateTo(path: string, queryParams?: object): void {
    this.router.navigate([path], { queryParams });
  }

  clearHistory(): void {
    this.navigationHistory = [];
  }
}
