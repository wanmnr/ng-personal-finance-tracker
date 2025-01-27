// app/layout/header/header1.component.ts
// Basic Header with Angular Material and Tailwind
import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { NavigationService } from '../services/navigation.service';
import { LayoutService } from '../services/layout1.service';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { ThemeService } from '@app/layout/services/theme1.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    LogoComponent,
  ],
  template: `
    <mat-toolbar
      class="flex items-center justify-between bg-white shadow-md px-4"
    >
      <div class="flex items-center gap-4">
        <app-logo size="medium"></app-logo>
        <button mat-icon-button (click)="toggleSidenav()">
          <mat-icon>menu</mat-icon>
        </button>
      </div>

      <div class="flex items-center gap-4">
        <button mat-icon-button>
          <mat-icon>notifications</mat-icon>
        </button>
        <button mat-icon-button [matMenuTriggerFor]="profileMenu">
          <mat-icon>account_circle</mat-icon>
        </button>

        <mat-menu #profileMenu="matMenu">
          <button (click)="toggleTheme()">
            Toggle {{ isDarkMode() ? 'Light' : 'Dark' }} Mode
          </button>
          <button mat-menu-item>
            <mat-icon>person</mat-icon>
            <span>Profile</span>
          </button>
          <button mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <mat-divider></mat-divider>
          <button mat-menu-item>
            <mat-icon>logout</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      :host {
        display: block;
        position: sticky;
        top: 0;
        z-index: 100;
      }
    `,
  ],
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  private layoutService = inject(LayoutService);
  private navigationService = inject(NavigationService);

  isDarkMode = toSignal(this.themeService.isDarkMode$);
  breadcrumbs = computed(() => this.navigationService.getBreadcrumbs());

  ngOnInit() {
    this.themeService.initializeTheme();
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }

  toggleSidenav() {
    this.layoutService.toggleSidenav();
  }

  // Navigation-related methods
  navigateWithPermissionCheck(route: string) {
    if (this.navigationService.canNavigate(route)) {
      // Navigate to route
    } else {
      // Handle unauthorized access
    }
  }
}
