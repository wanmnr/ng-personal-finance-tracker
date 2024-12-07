// app/core/layout/main/main1.component.ts
import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header1.component';
import { SidebarComponent } from '../sidebar/sidebar1.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { LayoutService } from '../../core/services/layout1.service';

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
          [mode]="isMobile ? 'over' : 'side'"
          [opened]="layoutService.getSidenavState()"
          class="w-64">
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
  `]
})
export class MainComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  private readonly isMobileSubject = new BehaviorSubject<boolean>(window.innerWidth < 768);
  isMobile = this.isMobileSubject.value;
  layoutService = inject(LayoutService);

  constructor() {
    this.handleResize();
  }

  private handleResize() {
    window.addEventListener('resize', () => {
      this.isMobileSubject.next(window.innerWidth < 768);
    });
  }
}
