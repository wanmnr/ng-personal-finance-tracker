// app/core/layout/sidebar/sidebar3.service.ts
// Context-Aware Dynamic Sidebar
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly _sidebarState = new BehaviorSubject<{
    context: string;
    items: any[];
    isOpen: boolean;
  }>({
    context: 'default',
    items: [],
    isOpen: true
  });

  sidebarState$ = this._sidebarState.asObservable();

  updateContext(context: string, items: any[]) {
    this._sidebarState.next({
      ...this._sidebarState.value,
      context,
      items
    });
  }

  toggle() {
    this._sidebarState.next({
      ...this._sidebarState.value,
      isOpen: !this._sidebarState.value.isOpen
    });
  }
}

// app/core/layout/sidebar/sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-dynamic-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule,
    FontAwesomeModule
  ],
  template: `
    <mat-sidenav-container class="h-screen">
      <mat-sidenav #sidenav mode="side"
        [opened]="(sidebarService.sidebarState$ | async)?.isOpen"
        class="w-64 bg-gray-800 text-white">

        <!-- Context Header -->
        <div class="p-4 border-b border-gray-700">
          <h2 class="text-xl font-bold">
            {{ (sidebarService.sidebarState$ | async)?.context }}
          </h2>
        </div>

        <!-- Dynamic Navigation -->
        <nav class="p-4">
          <ul class="space-y-2">
            @for (item of (sidebarService.sidebarState$ | async)?.items;
              track item.id) {
              <li>
                <a [routerLink]="item.route"
                  class="flex items-center space-x-3 p-3 rounded-lg
                  hover:bg-gray-700 transition-colors"
                  [class.bg-gray-700]="item.active">
                  <fa-icon [icon]="item.icon"
                    [class]="item.iconClass">
                  </fa-icon>
                  <span>{{ item.label }}</span>
                </a>
              </li>
            }
          </ul>
        </nav>

        <!-- Context Actions -->
        <div class="absolute bottom-0 w-full p-4
          border-t border-gray-700">
          <button (click)="onContextAction()"
            class="w-full py-2 px-4 bg-blue-600
            hover:bg-blue-700 rounded-lg">
            {{ getContextActionLabel() }}
          </button>
        </div>

      </mat-sidenav>

      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class DynamicSidebarComponent implements OnInit {
  constructor(public sidebarService: SidebarService) { }

  ngOnInit() {
    // Initialize with default context
    this.sidebarService.updateContext('Dashboard', [
      {
        id: 1,
        icon: faHome,
        label: 'Overview',
        route: '/dashboard',
        active: true
      }
      // More items...
    ]);
  }

  getContextActionLabel(): string {
    const context = this.sidebarService.sidebarState$.value.context;
    switch (context) {
      case 'Users':
        return 'Add New User';
      case 'Products':
        return 'Create Product';
      default:
        return 'New Item';
    }
  }

  onContextAction() {
    // Handle context-specific actions
    const context = this.sidebarService.sidebarState$.value.context;
    switch (context) {
      case 'Users':
        // Navigate to user creation
        break;
      case 'Products':
        // Open product creation modal
        break;
    }
  }
}
