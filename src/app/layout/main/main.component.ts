/**
 * @file main.component.ts
 * @module AppModule/Components
 *
 * @description
 * Primary layout component managing responsive sidebar navigation and content area.
 *
 * @remarks
 * This component serves as the application's shell, providing:
 * - Responsive sidebar that collapses on mobile devices
 * - Accessibility features including skip-to-main content
 * - Breadcrumb navigation
 * - Keyboard navigation support (Escape key handling)
 * - Material Design integration
 *
 * Navigation items are configured for Dashboard, Profile, and Settings routes.
 * The layout adapts to screen size changes using Angular's BreakpointObserver.
 */

import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  HostListener,
  inject,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header1.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LayoutService } from '../services/layout1.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    MatSidenavModule,
    MatCardModule,
  ],
  templateUrl: './main.component.html',
  styles: [
    `
      :host {
        @apply block h-screen;
      }

      .mat-drawer-container {
        @apply bg-transparent;
      }

      .sidebar-width {
        @apply w-64 transition-all duration-300;

        &.collapsed {
          @apply w-20;
        }
      }

      // Skip to main content link for keyboard users
      .skip-link {
        @apply sr-only focus:not-sr-only fixed left-4 top-4 px-4 py-2 bg-primary text-white z-50;
      }
    `,
  ],
})
export class MainComponent implements OnInit, AfterViewInit {
  /**
   * Reference to the Material sidenav component
   */
  @ViewChild('sidenav') sidenav!: MatSidenav;

  layoutService = inject(LayoutService);
  navigationService = inject(NavigationService);
  breakpointObserver = inject(BreakpointObserver);

  /**
   * Computed signals for reactive state management
   */
  breadcrumbs$ = computed(() => this.navigationService.getBreadcrumbs());
  layoutState$ = computed(() => this.layoutService.getLayoutState());
  sidenavState$ = computed(() => this.layoutService.getSidenavState());
  mobileState$ = computed(() => this.layoutService.getMobileState());

  isSidenavExpanded = true;

  /**
   * Subject for handling component cleanup
   * @private
   */
  private readonly destroy$ = new Subject<void>();

  /**
   * Navigation configuration for sidebar menu
   */
  navigationItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'person', label: 'Profile', route: '/profile' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
  ];

  /**
   * Initializes responsive layout behavior
   */
  constructor() {
    this.handleResize();
  }

  /**
   * Sets up screen size observer and initializes layout state
   */
  ngOnInit(): void {
    this.observeScreenSize();
  }

  /**
   * Handles escape key press for mobile navigation
   */
  @HostListener('window:keydown.escape')
  closeSidenavOnEscape(): void {
    if (this.mobileState$() && this.sidenavState$()) {
      this.layoutService.toggleSidenav();
    }
  }

  /**
   * Performs cleanup of subscriptions
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  /**
   * Observes screen size changes and updates layout accordingly
   * @private
   */
  private observeScreenSize(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.layoutService.setMobileState(result.matches);
      });
  }

  /**
   * Sets up window resize handler for mobile responsiveness
   * @private
   */
  private handleResize() {
    window.addEventListener('resize', () => {
      const isMobile = window.innerWidth < 768;
      this.layoutService.setMobileState(isMobile);
    });
  }

  // constructor(private readonly breakpointObserver: BreakpointObserver) { }

  // ngOnInit(): void {
  //   this.observeScreenSize();
  // }

  // ngAfterViewInit(): void {
  //   // Set initial sidenav state based on screen size
  //   setTimeout(() => {
  //     this.isMobile ? this.sidenav.close() : this.sidenav.open();
  //   });
  // }

  // ngOnDestroy(): void {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }

  // private observeScreenSize(): void {
  //   this.breakpointObserver
  //     .observe([Breakpoints.XSmall, Breakpoints.Small])
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(result => {
  //       this.isMobile = result.matches;
  //       if (this.isMobile) {
  //         this.isSidenavExpanded = false;
  //         this.sidenav?.close();
  //       } else {
  //         this.isSidenavExpanded = true;
  //         this.sidenav?.open();
  //       }
  //     });
  // }

  // toggleSidenav(): void {
  //   this.sidenav.toggle();
  //   if (!this.isMobile) {
  //     this.isSidenavExpanded = !this.isSidenavExpanded;
  //   }
  // }

  // @HostListener('window:keydown.escape')
  // closeSidenavOnEscape(): void {
  //   if (this.isMobile && this.sidenav.opened) {
  //     this.sidenav.close();
  //   }
  // }
}
