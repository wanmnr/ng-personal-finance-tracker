// app/core/layout/main/main4.component.ts
// Content Projection Based Layout
import { Component, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    MatSidenavModule,
    FontAwesomeModule
  ],
  template: `
    <div class="flex flex-col h-screen">
      <app-header>
        <ng-content select="[headerContent]"></ng-content>
      </app-header>

      <mat-sidenav-container class="flex-1">
        <mat-sidenav #sidenav
          [mode]="isExpanded ? 'side' : 'over'"
          [opened]="isExpanded"
          class="transition-all duration-300"
          [ngClass]="{'w-64': isExpanded, 'w-20': !isExpanded}">

          <div class="flex justify-end p-2">
            <button (click)="toggleExpanded()" class="text-gray-500">
              <fa-icon [icon]="isExpanded ? faCompress : faExpand">
              </fa-icon>
            </button>
          </div>

          <app-sidebar>
            <ng-content select="[sidebarContent]"></ng-content>
          </app-sidebar>
        </mat-sidenav>

        <mat-sidenav-content class="bg-gray-50">
          <div class="grid grid-cols-12 gap-4 p-6">
            <div class="col-span-12">
              <ng-content></ng-content>
              <router-outlet></router-outlet>
            </div>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    .mat-sidenav-container {
      background-color: #f5f5f5;
    }

    .mat-sidenav {
      transition: width 0.3s ease-in-out;
    }
  `]
})
export class MainComponent {
  isExpanded = true;
  faExpand = faExpand;
  faCompress = faCompress;

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
