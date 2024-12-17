// @app/app/app3.component.ts
// Approach 3: Hybrid Approach with Material, Font Awesome, and Tailwind
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChartLine,
  faUsers,
  faProjectDiagram,
  faTasks,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatButtonModule
  ],
  template: `
    <div class="h-screen flex flex-col">
      <mat-toolbar color="primary" class="z-10">
        <button mat-icon-button (click)="sidenav.toggle()">
          <fa-icon [icon]="menuIcon"></fa-icon>
        </button>
        <span class="ml-4">Enterprise Dashboard</span>
      </mat-toolbar>

      <mat-sidenav-container class="flex-1">
        <mat-sidenav #sidenav mode="side"
                     class="w-64 bg-gray-800 text-white">
          <div class="p-4">
            <nav>
              <ul class="space-y-2">
                <li *ngFor="let item of menuItems"
                    class="hover:bg-gray-700 rounded-lg">
                  <a class="flex items-center p-3 text-gray-300
                            hover:text-white transition-colors">
                    <fa-icon [icon]="item.icon" class="mr-3"></fa-icon>
                    {{item.label}}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </mat-sidenav>

        <mat-sidenav-content class="bg-gray-100">
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                        xl:grid-cols-4 gap-6">
              <div *ngFor="let stat of statistics"
                   class="bg-white rounded-lg shadow-md p-6
                          hover:shadow-lg transition-shadow">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-gray-500 text-sm">{{stat.label}}</p>
                    <p class="text-2xl font-semibold mt-1">{{stat.value}}</p>
                    <p class="text-sm"
                       [ngClass]="stat.trend > 0 ? 'text-green-600' :
                                                 'text-red-600'">
                      {{stat.trend}}% vs last month
                    </p>
                  </div>
                  <div class="text-2xl"
                       [ngClass]="stat.iconColor">
                    <fa-icon [icon]="stat.icon"></fa-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  menuIcon = faBars;

  menuItems = [
    { label: 'Analytics', icon: faChartLine },
    { label: 'Users', icon: faUsers },
    { label: 'Projects', icon: faProjectDiagram },
    { label: 'Tasks', icon: faTasks }
  ];

  statistics = [
    {
      label: 'Total Revenue',
      value: '$54,234',
      trend: 12.5,
      icon: faChartLine,
      iconColor: 'text-blue-500'
    },
    {
      label: 'Active Users',
      value: '2,345',
      trend: -2.4,
      icon: faUsers,
      iconColor: 'text-green-500'
    },
    {
      label: 'Projects',
      value: '45',
      trend: 8.7,
      icon: faProjectDiagram,
      iconColor: 'text-purple-500'
    },
    {
      label: 'Completion Rate',
      value: '89%',
      trend: 5.6,
      icon: faTasks,
      iconColor: 'text-yellow-500'
    }
  ];
}
