/**
 * @file header3.component.ts
 * @description Enterprise-Grade Header with Advanced Features
 * @module Layout
 */

import { Component, inject, signal, computed, Input, Output, EventEmitter } from '@angular/core';
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
import { AuthService } from '@app/features/auth/auth.service';
import { NotificationService } from '@core/services/notification.service';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

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
  templateUrl: './header3.component.html',
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
  @Input() sidenavOpen = false;
  @Output() menuClick = new EventEmitter<void>();

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
    report: faChartBar,
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
  isMobile = computed(() => this.breakpointObserver.isMatched('(max-width: 768px)'));

  constructor() {
    // Subscribe to theme changes
    this.themeService.isDarkMode$.pipe(takeUntilDestroyed()).subscribe(isDark => {
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
      .subscribe(notifications => {
        this.notifications.set(notifications);
        this.unreadNotifications.set(notifications.filter(n => !n.read).length);
      });
  }

  private loadUserProfile() {
    this.authService.currentUser$
      .pipe(
        takeUntilDestroyed(),
        map(user => {
          if (!user) return null;
          return {
            avatar: 'assets/default-avatar.png', // Or get from user if available
            name: user.name,
            role: 'User', // Set appropriate role or get from user if available
          } as UserProfile;
        })
      )
      .subscribe(userProfile => {
        this.userProfile.set(userProfile);
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
      info: 'bg-blue-100 text-blue-600',
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
