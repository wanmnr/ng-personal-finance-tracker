/**
 * @file dynamic-sidebar.component.ts
 * @description Context-aware dynamic sidebar component that adapts its content and actions based on the current context.
 */

import { Component, ViewChild, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  SidebarService,
  NavigationItem,
} from '@layout/services/dynamic-sidebar.service';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

/** Mapping of context to action labels */
type ContextActionMap = Readonly<Record<string, string>>;

/**
 * Dynamic sidebar component that provides context-aware navigation and actions.
 *
 * @remarks
 * This component dynamically updates its content and behavior based on the current
 * application context. It supports multiple navigation modes and context-specific actions.
 *
 * @example
 * ```html
 * <app-dynamic-sidebar></app-dynamic-sidebar>
 * ```
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
                [attr.aria-label]="item.label"
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
            class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            [attr.aria-label]="contextActionLabel$ | async"
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
export class DynamicSidebarComponent implements OnDestroy {
  /** Reference to the MatSidenav instance */
  @ViewChild('sidenav') private readonly sidenav!: MatSidenav;

  /** Service for managing sidebar state */
  protected readonly sidebarService = inject(SidebarService);

  /** Subject for managing component lifecycle and cleanup */
  private readonly destroy$ = new Subject<void>();

  /**
   * Mapping between contexts and their corresponding action labels
   *
   * @readonly
   * @private
   */
  private readonly CONTEXT_ACTION_MAP: ContextActionMap = {
    Users: 'Add New User',
    Products: 'Create Product',
    default: 'New Item',
  } as const;

  /** Stream of context-specific action labels */
  protected contextActionLabel$!: Observable<string>;

  /** Stream of current context values */
  protected currentContext$!: Observable<string>;

  /**
   * Default navigation items for the sidebar
   *
   * @readonly
   * @private
   */
  private readonly DEFAULT_NAV_ITEMS: NavigationItem[] = [
    {
      id: 1,
      icon: faHome,
      label: 'Overview',
      route: '/dashboard',
      active: true,
    },
  ];

  constructor() {
    this.initializeObservables();
    this.initializeSidebar();
  }

  /**
   * Initializes the component's observable streams
   *
   * @private
   */
  private initializeObservables(): void {
    this.contextActionLabel$ = this.sidebarService.sidebarState$.pipe(
      map(
        (state) =>
          this.CONTEXT_ACTION_MAP[state.context] ??
          this.CONTEXT_ACTION_MAP.default
      ),
      takeUntil(this.destroy$) // Ensures cleanup on destroy
    );

    this.currentContext$ = this.sidebarService.sidebarState$.pipe(
      map((state) => state.context),
      takeUntil(this.destroy$) // Ensures cleanup on destroy
    );
  }

  /**
   * Handles context-specific actions when the action button is clicked
   *
   * @protected
   */
  protected onContextAction(): void {
    this.currentContext$.pipe(takeUntil(this.destroy$)).subscribe((context) => {
      switch (context) {
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
    this.sidebarService.updateContext('Dashboard', this.DEFAULT_NAV_ITEMS);
  }

  /**
   * Performs user-specific actions
   *
   * @private
   */
  private handleUserAction(): void {
    // TODO: Implement user creation logic or navigation
    console.log('Handling user action');
  }

  /**
   * Performs product-specific actions
   *
   * @private
   */
  private handleProductAction(): void {
    // TODO: Implement product creation logic or modal opening
    console.log('Handling product action');
  }

  /**
   * Performs default actions when no specific context matches
   *
   * @private
   */
  private handleDefaultAction(): void {
    // TODO: Implement default action logic
    console.log('Handling default action');
  }

  /**
   * Cleans up component resources
   *
   * @inheritdoc
   */
  ngOnDestroy(): void {
    // Triggers all takeUntil operators to complete their subscriptions
    this.destroy$.next();
    // Cleans up the Subject itself
    this.destroy$.complete();
  }
}
