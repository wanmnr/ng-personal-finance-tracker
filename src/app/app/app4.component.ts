// @app/app/app4.component.ts
// Approach 4: Enterprise Dashboard with Advanced Features
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faUser,
  faCog,
  faSearch,
  faChartPie,
  faCalendar,
  faInbox,
  faSignOut
} from '@fortawesome/free-solid-svg-icons';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Top Navigation -->
      <nav class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <!-- Left side -->
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <img class="h-8 w-auto" src="logo.svg" alt="Logo">
              </div>

              <!-- Search bar -->
              <div class="hidden md:ml-6 md:flex md:items-center">
                <div class="relative w-96">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <fa-icon [icon]="faSearch" class="text-gray-400">
                    </fa-icon>
                  </div>
                  <input [formControl]="searchControl"
                         class="block w-full pl-10 pr-3 py-2 border border-gray-300
                                rounded-md leading-5 bg-white placeholder-gray-500
                                focus:outline-none focus:placeholder-gray-400
                                focus:ring-1 focus:ring-indigo-500
                                focus:border-indigo-500 sm:text-sm"
                         placeholder="Search...">
                </div>
              </div>
            </div>

            <!-- Right side -->
            <div class="flex items-center">
              <button mat-icon-button [matMenuTriggerFor]="notificationMenu"
                      class="ml-4">
                <fa-icon [icon]="faBell"></fa-icon>
                <span class="absolute top-2 right-2 h-2 w-2 rounded-full
                           bg-red-500"></span>
              </button>

              <button mat-icon-button [matMenuTriggerFor]="userMenu"
                      class="ml-4">
                <fa-icon [icon]="faUser"></fa-icon>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content Area -->
      <div class="flex">
        <!-- Sidebar -->
        <aside class="hidden md:flex md:flex-shrink-0">
          <div class="flex flex-col w-64">
            <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto
                        bg-white border-r border-gray-200">
              <div class="flex-grow flex flex-col">
                <nav class="flex-1 px-2 space-y-1">
                  <a *ngFor="let item of navigationItems"
                     [class]="item.active ?
                              'bg-gray-100 text-gray-900' :
                              'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
                     class="group flex items-center px-2 py-2 text-sm
                            font-medium rounded-md">
                    <fa-icon [icon]="item.icon"
                            [class]="item.active ?
                                     'text-gray-500' :
                                     'text-gray-400 group-hover:text-gray-500'"
                            class="mr-3 flex-shrink-0 h-6 w-6">
                    </fa-icon>
                    {{item.name}}
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1">
          <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3
                          lg:gap-8">
                <!-- Left column -->
                <div class="grid grid-cols-1 gap-4 lg:col-span-2">
                  <section aria-labelledby="section-1-title">
                    <h2 class="sr-only" id="section-1-title">Section title</h2>
                    <div class="rounded-lg bg-white overflow-hidden shadow">
                      <div class="p-6">
                        <!-- Your main content here -->
                      </div>
                    </div>
                  </section>
                </div>

                <!-- Right column -->
                <div class="grid grid-cols-1 gap-4">
                  <section aria-labelledby="section-2-title">
                    <h2 class="sr-only" id="section-2-title">Section title</h2>
                    <div class="rounded-lg bg-white overflow-hidden shadow">
                      <div class="p-6">
                        <!-- Your secondary content here -->
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <!-- Menus -->
      <mat-menu #notificationMenu="matMenu">
        <div class="py-1">
          <a *ngFor="let notification of notifications"
             class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            {{notification.message}}
          </a>
        </div>
      </mat-menu>

      <mat-menu #userMenu="matMenu">
        <div class="py-1">
          <a *ngFor="let item of userMenuItems"
             class="flex items-center px-4 py-2 text-sm text-gray-700
                    hover:bg-gray-100">
            <fa-icon [icon]="item.icon" class="mr-3 text-gray-400">
            </fa-icon>
            {{item.label}}
          </a>
        </div>
      </mat-menu>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class AppComponent implements OnInit {
  searchControl = new FormControl('');
  faSearch = faSearch;
  faBell = faBell;
  faUser = faUser;

  navigationItems = [
    { name: 'Dashboard', icon: faChartPie, active: true },
    { name: 'Calendar', icon: faCalendar, active: false },
    { name: 'Messages', icon: faInbox, active: false },
    { name: 'Settings', icon: faCog, active: false }
  ];

  notifications = [
    { message: 'New message received', time: '5m ago' },
    { message: 'Meeting reminder', time: '1h ago' },
    { message: 'Update available', time: '2h ago' }
  ];

  userMenuItems = [
    { label: 'Profile', icon: faUser },
    { label: 'Settings', icon: faCog },
    { label: 'Sign out', icon: faSignOut }
  ];

  isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches)
      );
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(value => {
      // Handle search here
      console.log('Search value:', value);
    });
  }
}
