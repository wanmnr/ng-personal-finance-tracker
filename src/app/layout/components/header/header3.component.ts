// app/core/layout/header/header.component.ts
// Enterprise-Grade Header with Advanced Features
import { Component, inject, signal, computed, effect } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faBell,
  faUser,
  faSearch,
  faCog,
  faSignOutAlt,
  faSun,
  faMoon,
  faPlus,
  faChartBar,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '@core/services/theme.service';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Notification {
  id: number;
  read: boolean;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  time: Date;
}

interface UserProfile {
  avatar: string;
  name: string;
  role: string;
}

interface QuickAction {
  id: number;
  label: string;
  icon: IconDefinition;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    TimeAgoPipe,
  ],
  template: `
    <header
      class="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200"
      [class.compact]="isCompact()"
    >
      <!-- Main Toolbar -->
      <div class="h-16 px-4 flex items-center justify-between">
        <!-- Left Section -->
        <div class="flex items-center gap-4">
          <button
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            (click)="toggleSidenav()"
          >
            <fa-icon
              [icon]="icons.menu"
              class="text-gray-600 dark:text-gray-300"
            ></fa-icon>
          </button>

          <a routerLink="/" class="flex items-center gap-2">
            <img
              [src]="
                isDarkMode() ? 'assets/logo-dark.svg' : 'assets/logo-light.svg'
              "
              alt="Logo"
              class="h-8"
            />
            @if (!isMobile()) {
            <span class="text-lg font-semibold dark:text-white">
              Company Name
            </span>
            }
          </a>
        </div>

        <!-- Search Section -->
        <div *ngIf="!isMobile()" class="flex-1 max-w-xl mx-8">
          <div class="relative">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (input)="onSearch()"
              class="w-full px-4 py-2 pl-10 rounded-lg border dark:border-gray-600
                     dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Search..."
            />
            <fa-icon
              [icon]="icons.search"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
            </fa-icon>
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-2">
          <!-- Theme Toggle -->
          <button
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            (click)="toggleTheme()"
          >
            <fa-icon
              [icon]="isDarkMode() ? icons.sun : icons.moon"
              class="text-gray-600 dark:text-gray-300"
            >
            </fa-icon>
          </button>

          <!-- Notifications -->
          <div class="relative">
            <button
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              [matMenuTriggerFor]="notificationsMenu"
            >
              <fa-icon
                [icon]="icons.bell"
                class="text-gray-600 dark:text-gray-300"
              >
              </fa-icon>
              @if (unreadNotifications() > 0) {
              <span
                class="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full
                         text-white text-xs flex items-center justify-center"
              >
                {{ unreadNotifications() }}
              </span>
              }
            </button>

            <mat-menu #notificationsMenu="matMenu" class="w-80">
              <div class="p-4">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold">Notifications</h3>
                  @if (unreadNotifications() > 0) {
                  <button
                    class="text-sm text-blue-500 hover:text-blue-600"
                    (click)="markAllAsRead()"
                  >
                    Mark all as read
                  </button>
                  }
                </div>

                @if (notifications().length > 0) {
                <div class="space-y-4">
                  @for (notification of notifications(); track notification.id)
                  {
                  <div
                    class="flex items-start gap-3 p-2 rounded-lg"
                    [class.bg-blue-50]="!notification.read"
                  >
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center"
                      [class]="getNotificationTypeClass(notification.type)"
                    >
                      <fa-icon
                        [icon]="getNotificationIcon(notification.type)"
                      ></fa-icon>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium">
                        {{ notification.title }}
                      </p>
                      <p class="text-xs text-gray-500">
                        {{ notification.time | timeAgo }}
                      </p>
                    </div>
                  </div>
                  }
                </div>
                } @else {
                <p class="text-center text-gray-500">No notifications</p>
                }
              </div>
            </mat-menu>
          </div>

          <!-- Profile Menu -->
          <div class="relative">
            <button
              class="flex items-center gap-2 px-3 py-2 rounded-lg
                     hover:bg-gray-100 dark:hover:bg-gray-700"
              [matMenuTriggerFor]="profileMenu"
            >
              <img
                [src]="userProfile()?.avatar || 'assets/default-avatar.png'"
                alt="Profile"
                class="h-8 w-8 rounded-full"
              />
              @if (!isMobile()) {
              <div class="text-left">
                <p class="text-sm font-medium dark:text-white">
                  {{ userProfile()?.name }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ userProfile()?.role }}
                </p>
              </div>
              }
            </button>

            <mat-menu #profileMenu="matMenu">
              <div class="py-2 w-48">
                <a
                  routerLink="/profile"
                  class="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100
                         dark:hover:bg-gray-700"
                >
                  <fa-icon [icon]="icons.user"></fa-icon>
                  Profile
                </a>
                <a
                  routerLink="/settings"
                  class="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100
                         dark:hover:bg-gray-700"
                >
                  <fa-icon [icon]="icons.settings"></fa-icon>
                  Settings
                </a>
                <div class="border-t my-2"></div>
                <button
                  (click)="logout()"
                  class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500
                         hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <fa-icon [icon]="icons.logout"></fa-icon>
                  Logout
                </button>
              </div>
            </mat-menu>
          </div>
        </div>
      </div>

      <!-- Quick Actions Bar -->
      @if (!isMobile() && showQuickActions()) {
      <div
        class="h-12 px-4 border-t dark:border-gray-700 flex items-center justify-between"
      >
        <div class="flex items-center gap-4">
          @for (action of quickActions(); track action.id) {
          <button
            class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                       hover:bg-gray-100 dark:hover:bg-gray-700"
            (click)="executeQuickAction(action)"
          >
            <fa-icon [icon]="action.icon"></fa-icon>
            {{ action.label }}
          </button>
          }
        </div>

        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {{ lastUpdateTime() | date : 'short' }}
          </span>
          <button
            class="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            (click)="refreshData()"
          >
            <fa-icon
              [icon]="icons.refresh"
              [class.animate-spin]="isRefreshing()"
            >
            </fa-icon>
          </button>
        </div>
      </div>
      }
    </header>
  `,
  styles: [
    `
      :host {
        display: block;
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .compact {
        transform: translateY(-100%);
        transition: transform 0.3s ease-in-out;
      }

      :host::ng-deep {
        .mat-menu-panel {
          @apply dark:bg-gray-800 dark:text-white;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService);
  private breakpointObserver = inject(BreakpointObserver);

  // Icons
  icons = {
    menu: faBars,
    bell: faBell,
    user: faUser,
    search: faSearch,
    settings: faCog,
    logout: faSignOutAlt,
    sun: faSun,
    moon: faMoon,
    refresh: faSyncAlt,
    add: faPlus,
    report: faChartBar
  };

  // Signals
  searchQuery = signal('');
  unreadNotifications = signal(0);
  notifications = signal<Notification[]>([]);
  userProfile = signal<UserProfile | null>(null);
  isDarkMode = signal(false);
  isCompact = signal(false);
  showQuickActions = signal(true);
  quickActions = signal<QuickAction[]>([]);
  lastUpdateTime = signal(new Date());
  isRefreshing = signal(false);

  // Computed values
  isMobile = computed(() =>
    this.breakpointObserver.isMatched('(max-width: 768px)')
  );

  constructor() {
    // Subscribe to theme changes
    this.themeService.isDarkMode$
      .pipe(takeUntilDestroyed())
      .subscribe((isDark) => {
        this.isDarkMode.set(isDark);
      });

    // Initialize notifications
    this.loadNotifications();

    // Initialize user profile
    this.loadUserProfile();

    // Setup scroll behavior
    this.setupScrollBehavior();

    // Load quick actions
    this.loadQuickActions();
  }

  private loadNotifications() {
    this.notificationService
      .getNotifications()
      .pipe(takeUntilDestroyed())
      .subscribe((notifications) => {
        this.notifications.set(notifications);
        this.unreadNotifications.set(
          notifications.filter((n) => !n.read).length
        );
      });
  }

  private loadUserProfile() {
    this.authService.currentUser$
      .pipe(takeUntilDestroyed())
      .subscribe((user) => {
        this.userProfile.set(user);
      });
  }

  private setupScrollBehavior() {
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > lastScroll && currentScroll > 100) {
        this.isCompact.set(true);
      } else {
        this.isCompact.set(false);
      }

      lastScroll = currentScroll;
    });
  }

  private loadQuickActions() {
    // Implementation depends on your requirements
    this.quickActions.set([
      { id: 1, label: 'New Project', icon: this.icons.add },
      { id: 2, label: 'Generate Report', icon: this.icons.report },
      // Add more quick actions...
    ]);
  }

  toggleSidenav() {
    // Implement sidenav toggle logic
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  onSearch() {
    // Implement search logic
  }

  markAllAsRead() {
    this.notificationService
      .markAllAsRead()
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.loadNotifications();
      });
  }

  getNotificationTypeClass(type: 'success' | 'warning' | 'error' | 'info'): string {
    const classes: Record<string, string> = {
      success: 'bg-green-100 text-green-600',
      warning: 'bg-yellow-100 text-yellow-600',
      error: 'bg-red-100 text-red-600',
      info: 'bg-blue-100 text-blue-600'
    };
    return classes[type] || classes['info'];
  }

  getNotificationIcon(type: string) {
    // Return appropriate icon based on notification type
    return this.icons.bell; // Simplified for example
  }

  executeQuickAction(action: QuickAction) {
    // Implement quick action execution logic
  }

  refreshData() {
    this.isRefreshing.set(true);
    // Implement refresh logic
    setTimeout(() => {
      this.isRefreshing.set(false);
      this.lastUpdateTime.set(new Date());
    }, 1000);
  }

  logout() {
    this.authService
      .logout()
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        // Handle logout completion
      });
  }
}
