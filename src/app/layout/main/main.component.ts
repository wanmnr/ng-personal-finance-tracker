// main.component.ts
import { Component, OnInit, ViewChild, AfterViewInit, HostListener, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header1.component';
import { SidebarComponent } from '../sidebar/sidebar1.component';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LayoutService } from '../services/layout1.service';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    MatSidenavModule,
    MatCardModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  layoutService = inject(LayoutService);
  navigationService = inject(NavigationService);
  breakpointObserver = inject(BreakpointObserver);

  breadcrumbs$ = computed(() => this.navigationService.getBreadcrumbs());
  layoutState$ = computed(() => this.layoutService.getLayoutState());
  sidenavState$ = computed(() => this.layoutService.getSidenavState());
  mobileState$ = computed(() => this.layoutService.getMobileState());

  isSidenavExpanded = true;
  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.handleResize();
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  private handleResize() {
    window.addEventListener('resize', () => {
      const isMobile = window.innerWidth < 768;
      this.layoutService.setMobileState(isMobile);
    });
  }

  // Example menu items - adjust based on your needs
  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'person', label: 'Profile', route: '/profile' },
    { icon: 'settings', label: 'Settings', route: '/settings' }
  ];

  ngOnInit(): void {
    this.observeScreenSize();
  }

  private observeScreenSize(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.layoutService.setMobileState(result.matches);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:keydown.escape')
  closeSidenavOnEscape(): void {
    if (this.mobileState$() && this.sidenavState$()) {
      this.layoutService.toggleSidenav();
    }
  }

  // constructor(private readonly breakpointObserver: BreakpointObserver) { }

  // ngOnInit(): void {
  //   this.observeScreenSize();
  // }

  // ngAfterViewInit(): void {
  //   // Set initial sidenav state based on screen size
  //   setTimeout(() => {
  //     this.isMobile ? this.sidenav.close() : this.sidenav.open();
  //   });
  // }

  // ngOnDestroy(): void {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }

  // private observeScreenSize(): void {
  //   this.breakpointObserver
  //     .observe([Breakpoints.XSmall, Breakpoints.Small])
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe(result => {
  //       this.isMobile = result.matches;
  //       if (this.isMobile) {
  //         this.isSidenavExpanded = false;
  //         this.sidenav?.close();
  //       } else {
  //         this.isSidenavExpanded = true;
  //         this.sidenav?.open();
  //       }
  //     });
  // }

  // toggleSidenav(): void {
  //   this.sidenav.toggle();
  //   if (!this.isMobile) {
  //     this.isSidenavExpanded = !this.isSidenavExpanded;
  //   }
  // }

  // @HostListener('window:keydown.escape')
  // closeSidenavOnEscape(): void {
  //   if (this.isMobile && this.sidenav.opened) {
  //     this.sidenav.close();
  //   }
  // }
}
