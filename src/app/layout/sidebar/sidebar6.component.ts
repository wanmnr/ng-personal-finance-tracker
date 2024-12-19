// app/core/layout/sidebar/sidebar.service.ts
// Stateful Sidebar with Search and Favorites
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatefulSidebarService {
  private readonly _favorites = new BehaviorSubject<Set<string>>(
    new Set(JSON.parse(localStorage.getItem('sidebarFavorites') || '[]'))
  );

  private readonly _searchQuery = new BehaviorSubject<string>('');

  readonly favorites$ = this._favorites.asObservable();
  readonly searchQuery$ = this._searchQuery.asObservable();

  toggleFavorite(itemId: string) {
    const currentFavorites = new Set(this._favorites.value);
    if (currentFavorites.has(itemId)) {
      currentFavorites.delete(itemId);
    } else {
      currentFavorites.add(itemId);
    }
    this._favorites.next(currentFavorites);
    localStorage.setItem('sidebarFavorites',
      JSON.stringify([...currentFavorites]));
  }

  updateSearchQuery(query: string) {
    this._searchQuery.next(query.toLowerCase());
  }
}

// app/core/layout/sidebar/stateful-sidebar.component.ts
import { Component, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { StatefulSidebarService } from './sidebar.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stateful-sidebar',
  standalone: true,
  imports: [
    MatSidenav,
    FontAwesomeModule
  ],
  template: `
    <mat-sidenav-container class="h-screen">
      <mat-sidenav #sidenav mode="side" opened
        class="w-64 bg-gray-800 text-white">

        <!-- Search Bar -->
        <div class="p-4">
          <div class="relative">
            <fa-icon [icon]="faSearch"
              class="absolute left-3 top-1/2 transform -translate-y-1/2
              text-gray-400">
            </fa-icon>
            <input type="text"
              [ngModel]="sidebarService.searchQuery$ | async"
              (ngModelChange)="sidebarService.updateSearchQuery($event)"
              class="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg
              text-white placeholder-gray-400 focus:outline-none
              focus:ring-2 focus:ring-blue-500"
              placeholder="Search...">
          </div>
        </div>

        <!-- Favorites Section -->
        @if ((filteredFavorites$ | async)?.length) {
          <div class="px-4 pt-2 pb-4">
            <h3 class="text-xs font-semibold text-gray-400 uppercase
              tracking-wider mb-3">
              Favorites
            </h3>
            <ul class="space-y-1">
              @for (item of filteredFavorites$ | async; track item.id) {
                <li>
                  <a [routerLink]="item.route"
                    class="flex items-center space-x-3 px-3 py-2
                    rounded-md hover:bg-gray-700 group">
                    <fa-icon [icon]="item.icon"
                      class="text-gray-400 group-hover:text-white">
                    </fa-icon>
                    <span>{{ item.label }}</span>
                    <button (click)="sidebarService.toggleFavorite(item.id)"
                      class="ml-auto text-yellow-500">
                      <fa-icon [icon]="faStar"></fa-icon>
                    </button>
                  </a>
                </li>
              }
            </ul>
          </div>
        }

        <!-- Main Navigation -->
        <nav class="px-4">
          <h3 class="text-xs font-semibold text-gray-400 uppercase
            tracking-wider mb-3">
            Navigation
          </h3>
          <ul class="space-y-1">
            @for (item of filteredItems$ | async; track item.id) {
              <li>
                <a [routerLink]="item.route"
                  class="flex items-center space-x-3 px-3 py-2
                  rounded-md hover:bg-gray-700 group">
                  <fa-icon [icon]="item.icon"
                    class="text-gray-400 group-hover:text-white">
                  </fa-icon>
                  <span>{{ item.label }}</span>
                  <button (click)="sidebarService.toggleFavorite(item.id)"
                    class="ml-auto"
                    [class.text-yellow-500]="
                      (sidebarService.favorites$ | async)?.has(item.id)
                    ">
                    <fa-icon [icon]="faStar"></fa-icon>
                  </button>
                </a>
              </li>
            }
          </ul>
        </nav>

      </mat-sidenav>

      <mat-sidenav-content class="p-6">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class StatefulSidebarComponent {
  private sidebarService = inject(StatefulSidebarService);

  navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: faHome,
      route: '/dashboard'
    },
    // ... other items
  ];

  filteredItems$ = combineLatest([
    this.sidebarService.searchQuery$,
    this.sidebarService.favorites$
  ]).pipe(
    map(([query, favorites]) =>
      this.navigationItems.filter(item =>
        !favorites.has(item.id) &&
        item.label.toLowerCase().includes(query)
      )
    )
  );

  filteredFavorites$ = combineLatest([
    this.sidebarService.searchQuery$,
    this.sidebarService.favorites$
  ]).pipe(
    map(([query, favorites]) =>
      this.navigationItems.filter(item =>
        favorites.has(item.id) &&
        item.label.toLowerCase().includes(query)
      )
    )
  );
}
