// app/core/layout/header/header.component.ts
// Modular Header with Dynamic Breadcrumbs
import { Component, inject, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import {
  faHome,
  faChevronRight,
  faBars
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    FontAwesomeModule,
    RouterModule
  ],
  template: `
    <mat-toolbar class="bg-white shadow-md">
      <div class="container mx-auto px-4">
        <!-- Top Section -->
        <div class="h-16 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button
              class="lg:hidden p-2 hover:bg-gray-100 rounded-full"
              (click)="toggleSidenav()">
              <fa-icon [icon]="menuIcon"></fa-icon>
            </button>
            <h1 class="text-xl font-semibold">{{currentPageTitle()}}</h1>
          </div>
        </div>

        <!-- Breadcrumbs Section -->
        <div class="h-12 flex items-center">
          <nav aria-label="breadcrumb" class="w-full">
            <ol class="flex items-center gap-2 text-sm">
              <li class="flex items-center">
                <a
                  routerLink="/"
                  class="text-gray-500 hover:text-gray-700 flex items-center gap-1">
                  <fa-icon [icon]="homeIcon" class="text-xs"></fa-icon>
                  Home
                </a>
              </li>
              @for (crumb of breadcrumbs(); track crumb.path) {
                <li class="flex items-center gap-2">
                  <fa-icon
                    [icon]="chevronIcon"
                    class="text-gray-400 text-xs">
                  </fa-icon>
                  <a
                    [routerLink]="crumb.path"
                    class="text-gray-500 hover:text-gray-700">
                    {{crumb.label}}
                  </a>
                </li>
              }
            </ol>
          </nav>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 100;
    }
  `]
})
export class HeaderComponent {
  private router = inject(Router);

  menuIcon = faBars;
  homeIcon = faHome;
  chevronIcon = faChevronRight;

  currentPageTitle = signal('Dashboard');
  breadcrumbs = signal<Array<{ path: string, label: string }>>([]);

  constructor() {
    this.setupBreadcrumbs();
  }

  private setupBreadcrumbs() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.router.routerState.root;
        const breadcrumbs = [];
        let url = '';

        while (route.firstChild) {
          route = route.firstChild;
          if (route.snapshot.data['breadcrumb']) {
            url += `/${route.snapshot.url.map(segment => segment.path).join('/')}`;
            breadcrumbs.push({
              label: route.snapshot.data['breadcrumb'],
              path: url
            });
          }
        }

        return breadcrumbs;
      })
    ).subscribe(breadcrumbs => {
      this.breadcrumbs.set(breadcrumbs);
      this.currentPageTitle.set(
        breadcrumbs[breadcrumbs.length - 1]?.label || 'Dashboard'
      );
    });
  }

  toggleSidenav() {
    // Implement sidenav toggle logic
  }
}
