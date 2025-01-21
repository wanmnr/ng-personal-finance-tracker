/**
 * @file dynamic-sidebar3.component.ts
 * @description Context-aware dynamic sidebar component that adapts its content and actions based on the current context.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  SidebarService,
  NavigationItem,
  SidebarState,
} from '@layout/services/sidebar3.service';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Interface for the context action mapping
 * @interface ContextActionMap
 */
interface ContextActionMap {
  readonly [key: string]: string;
}

/**
 * Dynamic sidebar component that provides context-aware navigation and actions
 * @class DynamicSidebarComponent
 */
@Component({
  selector: 'app-dynamic-sidebar',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, RouterModule, FontAwesomeModule],
  template: `
    <mat-sidenav-container class="h-screen">
      <mat-sidenav
        #sidenav
        mode="side"
        [opened]="(sidebarService.sidebarState$ | async)?.isOpen"
        class="w-64 bg-gray-800 text-white"
      >
        <!-- Context Header -->
        <div class="p-4 border-b border-gray-700">
          <h2 class="text-xl font-bold">
            {{ (sidebarService.sidebarState$ | async)?.context }}
          </h2>
        </div>

        <!-- Dynamic Navigation -->
        <nav class="p-4">
          <ul class="space-y-2">
            @for (item of (sidebarService.sidebarState$ | async)?.items; track
            item.id) {
            <li>
              <a
                [routerLink]="item.route"
                class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                [class.bg-gray-700]="item.active"
              >
                <fa-icon [icon]="item.icon" [class]="item.iconClass"></fa-icon>
                <span>{{ item.label }}</span>
              </a>
            </li>
            }
          </ul>
        </nav>

        <!-- Context Actions -->
        <div class="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button
            (click)="onContextAction()"
            class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            {{ contextActionLabel$ | async }}
          </button>
        </div>
      </mat-sidenav>

      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class DynamicSidebarComponent {
  /**
   * Mapping of contexts to their corresponding action labels
   * @private
   * @readonly
   */
  private readonly CONTEXT_ACTION_MAP: ContextActionMap = {
    Users: 'Add New User',
    Products: 'Create Product',
    default: 'New Item',
  };

  readonly contextActionLabel$: Observable<string>;
  readonly currentContext$: Observable<string>;

  /**
   * Observable that transforms the sidebar state into appropriate action labels
   * @public
   * @readonly
   */

  /**
   * Creates an instance of DynamicSidebarComponent
   * @constructor
   * @param {SidebarService} sidebarService - Service managing sidebar state
   */
  constructor(public sidebarService: SidebarService) {
    this.contextActionLabel$ = this.sidebarService.sidebarState$.pipe(
      map((state) =>
        this.CONTEXT_ACTION_MAP[state.context] ||
        this.CONTEXT_ACTION_MAP['default']
      )
    );

    this.currentContext$ = this.sidebarService.sidebarState$.pipe(
      map((state) => state.context)
    );

    this.initializeSidebar();
  }

  /**
   * Handles context-specific actions when the action button is clicked
   * @public
   */
  onContextAction(): void {
    this.sidebarService.sidebarState$
      .pipe(map((state) => state.context))
      .subscribe((currentContext) => {
        switch (currentContext) {
          case 'Users':
            this.handleUserAction();
            break;
          case 'Products':
            this.handleProductAction();
            break;
          default:
            this.handleDefaultAction();
        }
      });
  }

  /**
   * Initializes the sidebar with default context and navigation items
   * @private
   */
  private initializeSidebar(): void {
    this.sidebarService.updateContext('Dashboard', [
      {
        id: 1,
        icon: faHome,
        label: 'Overview',
        route: '/dashboard',
        active: true,
      },
      // Additional items can be added here
    ]);
  }

  /**
   * Handles user-specific actions
   * @private
   */
  private handleUserAction(): void {
    // Implement user creation logic or navigation
    console.log('Handling user action');
  }

  /**
   * Handles product-specific actions
   * @private
   */
  private handleProductAction(): void {
    // Implement product creation logic or modal opening
    console.log('Handling product action');
  }

  /**
   * Handles default actions when no specific context is matched
   * @private
   */
  private handleDefaultAction(): void {
    // Implement default action logic
    console.log('Handling default action');
  }
}
