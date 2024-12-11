// app/core/layout/header/header.component.ts
// Advanced Header with FontAwesome Icons and Dynamic Navigation
import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faBell,
  faUser,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '../../../core/services/navigation5.service';

interface NavigationItem {
  label: string;
  path: string;
  icon?: any;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule
  ],
  template: `
    <header class="bg-white shadow-md">
      <!-- Top Bar -->
      <div class="h-16 px-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button
            class="p-2 hover:bg-gray-100 rounded-full"
            (click)="toggleSidenav()">
            <fa-icon [icon]="menuIcon" class="text-gray-600"></fa-icon>
          </button>
          <img src="assets/logo.svg" alt="Logo" class="h-8">
        </div>

        <!-- Search Bar -->
        <div class="hidden md:flex items-center flex-1 max-w-xl mx-8">
          <div class="relative w-full">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (input)="onSearch()"
              class="w-full px-4 py-2 pl-10 rounded-lg border focus:ring-2 focus:ring-blue-500"
              placeholder="Search...">
            <fa-icon
              [icon]="searchIcon"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            </fa-icon>
          </div>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-2">
          <button
            class="p-2 hover:bg-gray-100 rounded-full relative"
            (click)="toggleNotifications()">
            <fa-icon [icon]="bellIcon" class="text-gray-600"></fa-icon>
            <span
              *ngIf="unreadNotifications > 0"
              class="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              {{unreadNotifications}}
            </span>
          </button>

          <div class="relative">
            <button
              class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
              (click)="toggleProfileMenu()">
              <img
                [src]="userProfile.avatar || 'assets/default-avatar.png'"
                alt="Profile"
                class="h-8 w-8 rounded-full">
              <span class="hidden md:block text-sm font-medium">
                {{userProfile.name}}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation Bar -->
      <nav
        *ngIf="showNavigation"
        class="h-12 px-4 border-t flex items-center">
        <ul class="flex gap-4">
          @for (item of navigationItems; track item.path) {
            <li>
              <a
                [routerLink]="item.path"
                routerLinkActive="text-blue-600 font-medium"
                class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <fa-icon
                  *ngIf="item.icon"
                  [icon]="item.icon">
                </fa-icon>
                {{item.label}}
              </a>
            </li>
          }
        </ul>
      </nav>
    </header>
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
  private readonly navigationService = inject(NavigationService);

  menuIcon = faBars;
  bellIcon = faBell;
  userIcon = faUser;
  searchIcon = faSearch;

  searchQuery = '';
  unreadNotifications = 5;
  showNavigation = true;
  userProfile = {
    name: 'John Doe',
    avatar: null
  };

  navigationItems: NavigationItem[] = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Projects', path: '/projects' },
    { label: 'Team', path: '/team' },
    { label: 'Reports', path: '/reports' }
  ];

  toggleSidenav() {
    this.navigationService.toggleSidenav();
  }

  toggleNotifications() {
    // Implement notifications panel logic
  }

  toggleProfileMenu() {
    // Implement profile menu logic
  }

  onSearch() {
    // Implement search logic
  }
}
