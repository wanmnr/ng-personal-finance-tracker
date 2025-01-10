// layout/dashboard10-header/dashboard-header.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  template: `
    <mat-toolbar
      role="banner"
      class="header-toolbar bg-primary text-on-primary"
    >
      <button
        *ngIf="isMobile"
        mat-icon-button
        (click)="toggleSidenav.emit()"
        aria-label="Toggle navigation menu"
      >
        <mat-icon>menu</mat-icon>
      </button>

      <h1 class="text-xl font-semibold">Personal Finance Tracker</h1>

      <div class="flex-grow"></div>

      <app-theme-toggle></app-theme-toggle>
      <app-user-menu></app-user-menu>
    </mat-toolbar>
  `,
  styles: [
    `
      .header-toolbar {
        @apply flex items-center px-4 h-16 shadow-md z-10;
      }
    `,
  ],
})
export class DashboardHeaderComponent {
  @Input() isMobile = false;
  @Output() toggleSidenav = new EventEmitter<void>();
}
