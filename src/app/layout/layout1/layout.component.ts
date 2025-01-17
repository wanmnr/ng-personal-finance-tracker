// layout/layout1/layout.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import {
  faDashboard,
  faUsers,
  faGear
} from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from './theme.service';
import { NavItem } from './nav-item.interface';
import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';
import { ContentWrapperComponent } from './content-wrapper.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    HeaderComponent,
    SidebarComponent,
    ContentWrapperComponent
  ],
  template: `
    <div class="layout-container h-screen flex flex-col" [attr.data-theme]="currentTheme">
      <app-header
        [title]="title"
        [isDarkTheme]="isDarkTheme"
        (menuToggled)="toggleSidenav()"
        (themeToggled)="toggleTheme()">
      </app-header>

      <mat-sidenav-container class="flex-grow">
        <mat-sidenav
          #sidenav
          [mode]="(isHandset$ | async) ? 'over' : 'side'"
          [opened]="!(isHandset$ | async)"
          role="navigation"
          class="w-64 bg-surface p-4"
          [attr.aria-label]="'Main navigation'">

          <app-sidebar [navigationItems]="navigationItems"></app-sidebar>
        </mat-sidenav>

        <mat-sidenav-content role="main">
          <app-content-wrapper></app-content-wrapper>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    .layout-container {
      @apply bg-background text-on-background;
    }

    [data-theme='dark'] {
      @apply bg-gray-900 text-white;

      :deep(.header-toolbar) {
        @apply bg-gray-800;
      }

      :deep(.nav-item) {
        &:hover {
          @apply bg-gray-700;
        }
        &.active-link {
          @apply bg-primary-dark;
        }
      }
    }

    :deep(:focus-visible) {
      @apply outline-2 outline-offset-2 outline-primary;
    }

    @media (forced-colors: active) {
      :deep(.nav-item.active-link) {
        forced-color-adjust: none;
        @apply border-2 border-current;
      }
    }
  `]
})
export class LayoutComponent implements OnInit {
  title = 'Dashboard';

  private breakpointObserver = inject(BreakpointObserver);
  private themeService = inject(ThemeService);

  navigationItems: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: faDashboard },
    { path: '/users', label: 'Users', icon: faUsers },
    { path: '/settings', label: 'Settings', icon: faGear }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isDarkTheme = false;
  currentTheme: 'light' | 'dark' = 'light';

  ngOnInit(): void {
    this.initializeTheme();
  }

  toggleSidenav(): void {
    // Implementation handled by template binding
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.currentTheme = this.isDarkTheme ? 'dark' : 'light';
    this.themeService.setTheme(this.currentTheme);
  }

  private initializeTheme(): void {
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
      this.isDarkTheme = theme === 'dark';
    });
  }
}
