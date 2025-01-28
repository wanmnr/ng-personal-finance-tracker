// app/layout/services/layout1.service.ts
import { computed, Injectable, signal } from '@angular/core';

export interface LayoutState {
  sidenavOpened: boolean;
  isMobile: boolean;
  theme: 'light' | 'dark';
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly layoutState = signal<LayoutState>({
    sidenavOpened: true,
    isMobile: false,
    theme: 'light',
  });

  // Add computed properties
  readonly sidenavMode = computed(() =>
    this.getMobileState() ? 'over' : 'side'
  );

  readonly sidenavWidth = computed(() =>
    this.getSidenavState() ? 'sidebar-width' : 'sidebar-width collapsed'
  );

  getIsDarkMode = computed(() => this.getLayoutState().theme === 'dark');

  toggleSidenav(): void {
    this.layoutState.update((state) => ({
      ...state,
      sidenavOpened: !state.sidenavOpened,
    }));
  }

  setMobileState(isMobile: boolean): void {
    this.layoutState.update((state) => ({
      ...state,
      isMobile,
      sidenavOpened: isMobile ? false : state.sidenavOpened,
    }));
  }

  toggleTheme(): void {
    this.layoutState.update((state) => ({
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light',
    }));
  }

  getLayoutState(): LayoutState {
    return this.layoutState();
  }

  getSidenavState(): boolean {
    return this.getLayoutState().sidenavOpened;
  }

  getMobileState(): boolean {
    return this.getLayoutState().isMobile;
  }

  getThemeState(): string {
    return this.getLayoutState().theme;
  }
}
