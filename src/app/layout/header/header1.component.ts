// app/core/layout/header/header1.component.ts
// Basic Header with Angular Material and Tailwind
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { NavigationService } from '../../core/services/navigation1.service';
import { LayoutService } from '../../core/services/layout1.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule
  ],
  template: `
    <mat-toolbar class="flex items-center justify-between bg-white shadow-md px-4">
      <div class="flex items-center gap-4">
        <button mat-icon-button (click)="toggleSidenav()">
          <mat-icon>menu</mat-icon>
        </button>
        <img src="assets/logo.svg" alt="Logo" class="h-8">
      </div>

      <div class="flex items-center gap-4">
        <button mat-icon-button>
          <mat-icon>notifications</mat-icon>
        </button>
        <button mat-icon-button [matMenuTriggerFor]="profileMenu">
          <mat-icon>account_circle</mat-icon>
        </button>

        <mat-menu #profileMenu="matMenu">
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
  styles: [`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 100;
    }
  `]
})
export class HeaderComponent {
  private readonly layoutService = inject(LayoutService);
  private readonly navigationService = inject(NavigationService);

  toggleSidenav() {
    this.layoutService.toggleSidenav();
  }
}
