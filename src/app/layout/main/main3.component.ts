// app/core/layout/main/main3.component.ts
// Enterprise-Grade Integration with Dynamic Components and Performance Optimizations

import { Component, inject, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header3.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatSidenavModule, MatSidenav, MatDrawerMode } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LayoutService } from 'src/app/layout/services/layout3.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    MatSidenavModule,
  ],
  template: `
    <div class="flex flex-col h-screen">
      <app-header [sidenavOpen]="sidenavOpen" (menuClick)="toggleSidenav()">
      </app-header>

      <mat-sidenav-container class="flex-1">
        <mat-sidenav
          #sidenav
          [mode]="sidenavMode"
          [opened]="sidenavOpen"
          (openedChange)="sidenavOpenChange($event)"
          class="w-64 border-r"
          [ngClass]="{ 'shadow-2xl': (layoutService.isMobile$ | async) }"
        >
          <app-sidebar></app-sidebar>
        </mat-sidenav>

        <mat-sidenav-content>
          <div class="grid grid-cols-12 gap-4 p-6">
            <div [class]="layoutService.contentClass$ | async">
              <router-outlet></router-outlet>
            </div>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
      }

      mat-sidenav-container {
        background-color: #f5f5f5;
      }

      mat-sidenav {
        transition: width 0.3s ease-in-out;
      }

      mat-sidenav-content {
        transition: margin-left 0.3s ease-in-out;
      }

      @media (max-width: 768px) {
        mat-sidenav {
          width: 100% !important;
        }
      }
    `,
  ],
})
export class MainComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  private router = inject(Router);
  protected layoutService = inject(LayoutService);

  sidenavOpen = true;
  sidenavMode: MatDrawerMode = 'side'; // default mode

  constructor() {
    // Subscribe to layout service's sidenav mode
    this.layoutService.sidenavMode$.pipe(
      map(mode => mode || 'side'), // Ensure we always have a valid mode
      takeUntilDestroyed()
    ).subscribe(mode => {
      this.sidenavMode = mode;
    });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        if (this.layoutService.isMobile()) {
          this.sidenav?.close();
        }
      });
  }

  ngAfterViewInit() {
    this.layoutService.setSidenav(this.sidenav);
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  sidenavOpenChange(open: boolean) {
    this.sidenavOpen = open;
  }
}
