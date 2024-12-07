// app/core/layout/sidebar/sidebar1.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
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
    MatSidenavModule,
    RouterModule,
    FontAwesomeModule,
    CommonModule
  ],
  template: `
    <mat-sidenav-container class="h-screen">
      <mat-sidenav #sidenav mode="side" opened
        class="w-64 bg-gray-800 text-white p-4">

        <div class="flex flex-col space-y-6">
          <!-- Logo/Brand -->
          <div class="flex items-center space-x-3 px-4">
            <img src="assets/logo.svg" class="h-8 w-8" alt="Logo">
            <span class="text-xl font-bold">Dashboard</span>
          </div>

          <!-- Navigation Items -->
          <nav class="flex-1">
            <ul class="space-y-2">
              <li>
                <a routerLink="/dashboard"
                  class="flex items-center space-x-3 p-3 rounded-lg
                  hover:bg-gray-700 transition-colors">
                  <fa-icon [icon]="faHome" class="text-gray-400">
                  </fa-icon>
                  <span>Home</span>
                </a>
              </li>
              <!-- Other navigation items -->
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
        </div>

      </mat-sidenav>

      <mat-sidenav-content class="p-6">
        <!-- <router-outlet></router-outlet> -->
      </mat-sidenav-content>
    </mat-sidenav-container>
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
