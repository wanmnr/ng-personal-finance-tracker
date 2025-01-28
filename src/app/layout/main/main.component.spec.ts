// main.component.spec.ts

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { BehaviorSubject, Subject, of } from 'rxjs';

import { MainComponent } from './main.component';
import { HeaderComponent } from '../header/header1.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LayoutService } from '../services/layout1.service';
import { NavigationService } from '../services/navigation.service';
import { By } from '@angular/platform-browser';

interface LayoutState {
  sidenavOpened: boolean;
  isMobile: boolean;
  theme: 'light' | 'dark';
}

type SidenavWidthType = 'sidebar-width' | 'sidebar-width collapsed';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let layoutService: jasmine.SpyObj<LayoutService>;
  let navigationService: jasmine.SpyObj<NavigationService>;
  let breakpointObserver: jasmine.SpyObj<BreakpointObserver>;
  let breakpointSubject: BehaviorSubject<any>;

  const mockNavigationItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'person', label: 'Profile', route: '/profile' },
    { icon: 'settings', label: 'Settings', route: '/settings' },
  ];

  beforeEach(async () => {
    breakpointSubject = new BehaviorSubject({ matches: false });

    layoutService = jasmine.createSpyObj('LayoutService', [
      'getLayoutState',
      'getSidenavState',
      'getMobileState',
      'setMobileState',
      'toggleSidenav',
      'getIsDarkMode',
      'sidenavMode',
      'sidenavWidth',
    ]);

    navigationService = jasmine.createSpyObj('NavigationService', [
      'getBreadcrumbs',
    ]);
    breakpointObserver = jasmine.createSpyObj('BreakpointObserver', [
      'observe',
    ]);

    // Setup default spy returns with correct types
    layoutService.getLayoutState.and.returnValue({
      sidenavOpened: true,
      isMobile: false,
      theme: 'light',
    } as LayoutState);

    layoutService.getSidenavState.and.returnValue(true);
    layoutService.getMobileState.and.returnValue(false);
    layoutService.getIsDarkMode.and.returnValue(false);
    layoutService.sidenavMode.and.returnValue('side');
    layoutService.sidenavWidth.and.returnValue(
      'sidebar-width' as SidenavWidthType
    );
    navigationService.getBreadcrumbs.and.returnValue(['Home', 'Dashboard']);
    breakpointObserver.observe.and.returnValue(breakpointSubject);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatCardModule,
      ],
      declarations: [MainComponent, HeaderComponent, SidebarComponent],
      providers: [
        { provide: LayoutService, useValue: layoutService },
        { provide: NavigationService, useValue: navigationService },
        { provide: BreakpointObserver, useValue: breakpointObserver },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default navigation items', () => {
      expect(component.navigationItems).toEqual(mockNavigationItems);
    });

    it('should initialize breadcrumbs', () => {
      const breadcrumbs = component.breadcrumbs$();
      expect(breadcrumbs).toEqual(['Home', 'Dashboard']);
    });
  });

  describe('Breakpoint Observation', () => {
    it('should observe screen size changes', fakeAsync(() => {
      breakpointSubject.next({ matches: true });
      tick();
      expect(layoutService.setMobileState).toHaveBeenCalledWith(true);

      breakpointSubject.next({ matches: false });
      tick();
      expect(layoutService.setMobileState).toHaveBeenCalledWith(false);
    }));
  });

  describe('Window Resize Handling', () => {
    it('should handle window resize events', fakeAsync(() => {
      const resizeEvent = new Event('resize');
      window.innerWidth = 600; // Mobile width
      window.dispatchEvent(resizeEvent);
      tick();
      expect(layoutService.setMobileState).toHaveBeenCalledWith(true);

      window.innerWidth = 1024; // Desktop width
      window.dispatchEvent(resizeEvent);
      tick();
      expect(layoutService.setMobileState).toHaveBeenCalledWith(false);
    }));
  });

  describe('Escape Key Handling', () => {
    it('should close sidenav on escape key in mobile view', () => {
      layoutService.getMobileState.and.returnValue(true);
      layoutService.getSidenavState.and.returnValue(true);

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(escapeEvent);

      expect(layoutService.toggleSidenav).toHaveBeenCalled();
    });

    it('should not close sidenav on escape key in desktop view', () => {
      layoutService.getMobileState.and.returnValue(false);
      layoutService.getSidenavState.and.returnValue(true);

      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(escapeEvent);

      expect(layoutService.toggleSidenav).not.toHaveBeenCalled();
    });
  });

  describe('Template Integration', () => {
    it('should render header component', () => {
      const header = fixture.debugElement.query(By.directive(HeaderComponent));
      expect(header).toBeTruthy();
    });

    it('should render sidebar component', () => {
      const sidebar = fixture.debugElement.query(
        By.directive(SidebarComponent)
      );
      expect(sidebar).toBeTruthy();
    });

    it('should render breadcrumbs correctly', () => {
      fixture.detectChanges();
      const breadcrumbsElement = fixture.debugElement.query(
        By.css('[aria-label="Breadcrumb"]')
      );
      expect(breadcrumbsElement.nativeElement.textContent).toContain('Home');
      expect(breadcrumbsElement.nativeElement.textContent).toContain(
        'Dashboard'
      );
    });
  });

  describe('Dark Mode Integration', () => {
    it('should apply dark mode class when enabled', () => {
      layoutService.getIsDarkMode.and.returnValue(true);
      fixture.detectChanges();
      const container = fixture.debugElement.query(By.css('.min-h-screen'));
      expect(container.classes['dark:bg-gray-900']).toBeTruthy();
    });
  });

  describe('Cleanup', () => {
    it('should cleanup subscriptions on destroy', () => {
      const destroySpy = spyOn(component['destroy$'], 'next');
      const completeSpy = spyOn(component['destroy$'], 'complete');

      component.ngOnDestroy();

      expect(destroySpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('Performance', () => {
    it('should not trigger unnecessary change detection', fakeAsync(() => {
      const detectChangesSpy = spyOn(fixture, 'detectChanges');
      breakpointSubject.next({ matches: false });
      tick();
      expect(detectChangesSpy).toHaveBeenCalledTimes(1);
    }));
  });

  describe('Error Handling', () => {
    it('should handle breakpoint observer errors', fakeAsync(() => {
      const errorSpy = spyOn(console, 'error');
      breakpointSubject.error(new Error('Breakpoint observer error'));
      tick();
      expect(errorSpy).toHaveBeenCalled();
    }));
  });
});
