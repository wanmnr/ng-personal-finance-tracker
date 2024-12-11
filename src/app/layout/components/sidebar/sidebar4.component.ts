// app/core/layout/sidebar/sidebar.config.ts
// Responsive Sidebar with Theme Support
export interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  hover: string;
}

export const THEMES: Record<string, ThemeConfig> = {
  dark: {
    primary: 'bg-gray-800',
    secondary: 'bg-gray-700',
    background: 'bg-gray-900',
    text: 'text-white',
    hover: 'hover:bg-gray-600'
  },
  light: {
    primary: 'bg-white',
    secondary: 'bg-gray-100',
    background: 'bg-gray-50',
    text: 'text-gray-800',
    hover: 'hover:bg-gray-200'
  }
};

// app/core/layout/sidebar/sidebar.component.ts
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { THEMES, ThemeConfig } from './sidebar.config';

@Component({
  selector: 'app-responsive-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    FontAwesomeModule
  ],
  template: `
    <div [class]="currentTheme.background" class="h-screen">
      <!-- Mobile Header -->
      @if (isMobile) {
        <div [class]="currentTheme.primary"
          class="fixed top-0 w-full z-50 px-4 py-3
          flex items-center justify-between">
          <button (click)="toggleMobileSidebar()"
            [class]="currentTheme.text">
            <fa-icon [icon]="faBars"></fa-icon>
          </button>
          <h1 class="text-lg font-bold">Dashboard</h1>
          <button (click)="toggleTheme()"
            [class]="currentTheme.text">
            <fa-icon [icon]="currentTheme === THEMES.dark ?
              faSun : faMoon">
            </fa-icon>
          </button>
        </div>
      }

      <!-- Sidebar -->
      <mat-sidenav-container class="h-full">
        <mat-sidenav #sidenav
          [mode]="isMobile ? 'over' : 'side'"
          [opened]="!isMobile"
          [class]="currentTheme.primary + ' ' +
            (isMobile ? 'w-64' : 'w-64 lg:w-72')"
          class="transition-all duration-300">

          <!-- Desktop Header -->
          @if (!isMobile) {
            <div class="p-4 flex justify-between items-center">
              <h1 class="text-lg font-bold">Dashboard</h1>
              <button (click)="toggleTheme()"
                [class]="currentTheme.text">
                <fa-icon [icon]="currentTheme === THEMES.dark ?
                  faSun : faMoon">
                </fa-icon>
              </button>
            </div>
          }

          <!-- Navigation -->
          <nav class="p-4">
            <ul class="space-y-2">
              @for (item of navigationItems; track item.label) {
                <li>
                  <a [routerLink]="item.route"
                    [class]="currentTheme.text + ' ' +
                      currentTheme.hover"
                    class="flex items-center space-x-3 p-3
                    rounded-lg transition-colors"
                    routerLinkActive="{{currentTheme.secondary}}">
                    <fa-icon [icon]="item.icon"></fa-icon>
                    <span>{{ item.label }}</span>
                  </a>
                </li>
              }
            </ul>
          </nav>

          <!-- Footer -->
          <div class="absolute bottom-0 w-full p-4
            border-t" [class]="getBorderColor()">
            <div class="flex items-center space-x-3">
              <img src="assets/avatar.jpg"
                class="h-10 w-10 rounded-full"
                alt="Profile">
              <div>
                <p class="font-medium">John Doe</p>
                <p class="text-sm opacity-75">Admin</p>
              </div>
            </div>
          </div>

        </mat-sidenav>

        <mat-sidenav-content
          [class]="currentTheme.background"
          [style.marginTop]="isMobile ? '64px' : '0'">
          <div class="p-6">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `
})
export class ResponsiveSidebarComponent {
  THEMES = THEMES;
  currentTheme: ThemeConfig = THEMES.dark;
  isMobile = false;

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  toggleTheme() {
    this.currentTheme =
      this.currentTheme === THEMES.dark ? THEMES.light : THEMES.dark;
  }

  getBorderColor(): string {
    return this.currentTheme === THEMES.dark ?
      'border-gray-700' : 'border-gray-200';
  }

  toggleMobileSidebar() {
    this.sidenav.toggle();
  }
}
