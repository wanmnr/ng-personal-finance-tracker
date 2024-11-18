// main.component.ts
import { Component, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MatSidenavModule,
    MatCardModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  isSidenavExpanded = true;
  isMobile = false;
  private destroy$ = new Subject<void>();
  
  // Example menu items - adjust based on your needs
  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'person', label: 'Profile', route: '/profile' },
    { icon: 'settings', label: 'Settings', route: '/settings' }
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.observeScreenSize();
  }

  ngAfterViewInit(): void {
    // Set initial sidenav state based on screen size
    setTimeout(() => {
      this.isMobile ? this.sidenav.close() : this.sidenav.open();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private observeScreenSize(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.isMobile = result.matches;
        if (this.isMobile) {
          this.isSidenavExpanded = false;
          this.sidenav?.close();
        } else {
          this.isSidenavExpanded = true;
          this.sidenav?.open();
        }
      });
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
    if (!this.isMobile) {
      this.isSidenavExpanded = !this.isSidenavExpanded;
    }
  }

  @HostListener('window:keydown.escape')
  closeSidenavOnEscape(): void {
    if (this.isMobile && this.sidenav.opened) {
      this.sidenav.close();
    }
  }
}
