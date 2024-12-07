// app/core/services/layout1.service.ts
import { Injectable, signal } from '@angular/core';

export interface LayoutState {
  sidenavOpened: boolean;
  isMobile: boolean;
  theme: 'light' | 'dark';
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private readonly layoutState = signal<LayoutState>({
    sidenavOpened: true,
    isMobile: false,
    theme: 'light'
  });

  private readonly sidenavOpenedState = signal<boolean>(true);

  // toggleSidenav(): void {
  //   this.layoutState.update(state => ({
  //     ...state,
  //     sidenavOpened: !state.sidenavOpened
  //   }));
  // }

  toggleSidenav(): void {
    this.sidenavOpenedState.update(state => !state);
  }

  setMobileState(isMobile: boolean): void {
    this.layoutState.update(state => ({
      ...state,
      isMobile,
      sidenavOpened: isMobile ? false : state.sidenavOpened
    }));
  }

  toggleTheme(): void {
    this.layoutState.update(state => ({
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light'
    }));
  }

  // getLayoutState(): LayoutState {
  //   return this.layoutState();
  // }

  getSidenavState(): boolean {
    return this.sidenavOpenedState();
  }
}
