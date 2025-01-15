// app/core/layout/main/main.component.ts
// Advanced Integration with State Management and Grid System
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    MatSidenavModule,
    MatGridListModule
  ],
  template: `
    <div class="grid grid-rows-[auto,1fr] h-screen">
      <app-header
        (menuClick)="toggleSidenav()"
        class="row-span-1">
      </app-header>

      <mat-sidenav-container class="row-span-1">
        <mat-sidenav
          #sidenav
          [mode]="(isHandset$ | async) ? 'over' : 'side'"
          [opened]="!(isHandset$ | async)"
          class="w-64 border-r">
          <app-sidebar></app-sidebar>
        </mat-sidenav>

        <mat-sidenav-content>
          <div class="grid grid-cols-12 gap-4 p-6">
            <div [class]="contentColumnClass$ | async">
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

    mat-sidenav-container {
      background-color: #f5f5f5;
    }

    mat-sidenav-content {
      transition: margin-left 0.3s ease-in-out;
    }
  `]
})
export class MainComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  contentColumnClass$ = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium])
    .pipe(
      map(result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          return 'col-span-12';
        }
        if (result.breakpoints[Breakpoints.Small]) {
          return 'col-span-12';
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          return 'col-span-10 col-start-2';
        }
        return 'col-span-8 col-start-3';
      })
    );

  toggleSidenav() {
    // Implement sidenav toggle logic
  }
}
