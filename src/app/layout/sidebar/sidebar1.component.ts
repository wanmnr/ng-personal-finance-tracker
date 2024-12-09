// app/core/layout/sidebar/sidebar1.component.ts
// Basic Side Navigation with Angular Material
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHome,
  faUsers,
  faCog,
  faChartBar
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    FontAwesomeModule,
    CommonModule
  ],
  template: `
      <!-- Logo/Brand -->
      <div class="flex items-center space-x-3 px-4">
        <img src="assets/logo.svg" class="h-8 w-8" alt="Logo">
        <span class="text-xl font-bold">Dashboard</span>
      </div>

      <!-- Navigation Items -->
      <nav class="flex-1 mt-6">
        <ul class="space-y-2">
          <li *ngFor="let item of navigationItems">
            <a [routerLink]="item.route"
              class="flex items-center space-x-3 p-3 rounded-lg
              hover:bg-gray-700 transition-colors">
              <fa-icon [icon]="item.icon" class="text-gray-400"></fa-icon>
              <span>{{item.label}}</span>
            </a>
          </li>
        </ul>
      </nav>

      <!-- User Profile -->
      <div class="border-t border-gray-700 pt-4">
        <div class="flex items-center space-x-3 px-4">
          <div class="h-10 w-10 rounded-full bg-gray-600"></div>
          <div>
            <p class="font-medium">John Doe</p>
            <p class="text-sm text-gray-400">Admin</p>
          </div>
        </div>
      </div>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  faHome = faHome;
  faUsers = faUsers;
  faCog = faCog;
  faChartBar = faChartBar;

  navigationItems = [
    { icon: this.faHome, label: 'Dashboard', route: '/dashboard' },
    { icon: this.faUsers, label: 'Users', route: '/users' },
    { icon: this.faChartBar, label: 'Analytics', route: '/analytics' },
    { icon: this.faCog, label: 'Settings', route: '/settings' }
  ];
}
