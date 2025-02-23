/**
 * @file header.component.ts
 * @description Basic Header
 * @module Layout
 */

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { LogoComponent } from '../../shared/components/logo/logo.component';

interface NavItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    FormsModule,
    MatTooltipModule,
    MatDividerModule,
    LogoComponent,
  ],
  templateUrl: './header.component.html',
  styles: [
    `
      :host {
        @apply block;
      }

      .focus-outline {
        @apply focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800;
      }

      .mat-toolbar {
        @apply shadow-sm;
      }
    `,
  ],
})
export class HeaderComponent {
  @Input() appName = 'My App';
  @Input() notificationCount = 0;
  @Input() userName = 'John Doe';
  @Input() userAvatar?: string;
  @Output() menuClick = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<boolean>();

  isDarkMode = false;
  isSearchVisible = false;

  navItems: NavItem[] = [
    { label: 'Home', route: '/', icon: 'home' },
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'About', route: '/about', icon: 'info' },
  ];

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeToggle.emit(this.isDarkMode);
    document.documentElement.classList.toggle('dark');
  }

  toggleSearch(): void {
    this.isSearchVisible = !this.isSearchVisible;
    if (this.isSearchVisible) {
      setTimeout(() => {
        document.getElementById('searchInput')?.focus();
      }, 100);
    }
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    // Implement search logic here
    console.log('Searching for:', value);
  }
}
