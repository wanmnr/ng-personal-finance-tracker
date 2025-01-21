// app/core/layout/sidebar/sidebar2.component.ts
// Collapsible Multi-Level Navigation
import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChevronDown,
  faChevronRight,
  faHome,
  faUserEdit,
  faUserPlus,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    FontAwesomeModule,
  ],
  animations: [
    trigger('submenuState', [
      state(
        'closed',
        style({
          height: '0',
          overflow: 'hidden',
        })
      ),
      state(
        'open',
        style({
          height: '*',
        })
      ),
      transition('closed <=> open', [animate('200ms ease-in-out')]),
    ]),
  ],
  template: `
    <mat-sidenav-container class="h-screen">
      <mat-sidenav
        #sidenav
        mode="side"
        opened
        [class]="isCollapsed ? 'w-20' : 'w-64'"
        class="bg-gray-800 text-white transition-all duration-300"
      >
        <!-- Toggle Button -->
        <button
          (click)="toggleSidebar()"
          class="absolute -right-3 top-10 bg-white rounded-full p-1
          border border-gray-300 hover:bg-gray-100"
        >
          <fa-icon [icon]="faChevronRight" [class.rotate-180]="!isCollapsed">
          </fa-icon>
        </button>

        <!-- Navigation -->
        <nav class="p-4">
          <ul class="space-y-2">
            @for (item of menuItems; track item.label) {
            <li>
              <!-- Parent Menu Item -->
              <div
                (click)="toggleSubmenu(item)"
                class="flex items-center justify-between p-3
                  rounded-lg cursor-pointer hover:bg-gray-700"
              >
                <div class="flex items-center space-x-3">
                  <fa-icon [icon]="item.icon" class="text-gray-400"> </fa-icon>
                  @if (!isCollapsed) {
                  <span>{{ item.label }}</span>
                  }
                </div>
                @if (item.children && !isCollapsed) {
                <fa-icon
                  [icon]="faChevronDown"
                  [class.rotate-180]="item.isOpen"
                  class="transition-transform duration-200"
                >
                </fa-icon>
                }
              </div>

              <!-- Submenu -->
              @if (item.children) {
              <div [@submenuState]="item.isOpen ? 'open' : 'closed'">
                <ul class="ml-8 space-y-2 mt-2">
                  @for (child of item.children; track child.label) {
                  <li>
                    <a
                      [routerLink]="child.route"
                      class="flex items-center space-x-3 p-2
                            rounded-lg hover:bg-gray-700"
                    >
                      <fa-icon [icon]="child.icon" class="text-gray-400">
                      </fa-icon>
                      @if (!isCollapsed) {
                      <span>{{ child.label }}</span>
                      }
                    </a>
                  </li>
                  }
                </ul>
              </div>
              }
            </li>
            }
          </ul>
        </nav>
      </mat-sidenav>

      <mat-sidenav-content
        [class]="isCollapsed ? 'ml-20' : 'ml-64'"
        class="transition-all duration-300"
      >
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export class SidebarComponent {
  isCollapsed = false;
  faChevronDown = faChevronDown;
  faChevronRight = faChevronRight;

  menuItems = [
    {
      icon: faHome,
      label: 'Dashboard',
      route: '/dashboard',
      isOpen: false,
    },
    {
      icon: faUsers,
      label: 'User Management',
      isOpen: false,
      children: [
        { icon: faUserPlus, label: 'Add User', route: '/users/add' },
        { icon: faUserEdit, label: 'Edit Users', route: '/users/edit' },
      ],
    },
    // More menu items...
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleSubmenu(item: any) {
    if (item.children) {
      item.isOpen = !item.isOpen;
    }
  }
}
