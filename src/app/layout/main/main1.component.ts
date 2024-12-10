// app/core/layout/main/main1.component.ts
// Basic Integration with Responsive Layout
import { Component, computed, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header1.component';
import { SidebarComponent } from '../sidebar/sidebar1.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { LayoutService } from '../services/layout1.service';
import { NavigationService } from '../../core/services/navigation.service'

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    MatSidenavModule
  ],
  template: `
    <div class="flex flex-col h-screen">
      <app-header></app-header>

      <mat-sidenav-container class="flex-1">
        <mat-sidenav
          #sidenav
          [mode]="layoutService.getLayoutState().isMobile ? 'over' : 'side'"
          [opened]="layoutService.getLayoutState().sidenavOpened"
          class="w-64 bg-gray-800 text-white p-4">
          <app-sidebar></app-sidebar>
        </mat-sidenav>

        <mat-sidenav-content class="p-6">
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }

    mat-sidenav-container {
      background-color: #f5f5f5;
    }

    ::ng-deep .mat-drawer {
      border-radius: 0 !important;
    }
  `]
})
export class MainComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  layoutService = inject(LayoutService);
  navigationService = inject(NavigationService);

  breadcrumbs$ = computed(() => this.navigationService.getBreadcrumbs());
  layoutState$ = computed(() => this.layoutService.getLayoutState());

  constructor() {
    this.handleResize();
  }

  private handleResize() {
    window.addEventListener('resize', () => {
      const isMobile = window.innerWidth < 768;
      this.layoutService.setMobileState(isMobile);
    });
  }

  // private readonly isMobileSubject = new BehaviorSubject<boolean>(window.innerWidth < 768);
  // isMobile = this.isMobileSubject.value;

}
