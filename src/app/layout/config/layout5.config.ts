// layout5.config.ts
import { InjectionToken } from '@angular/core';

export interface LayoutConfig {
  sidenavWidth: string;
  sidenavMode: 'side' | 'over' | 'push';
  headerHeight: string;
  enableAnimation: boolean;
  defaultExpanded: boolean;
}

export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  sidenavWidth: '16rem',
  sidenavMode: 'side',
  headerHeight: '64px',
  enableAnimation: true,
  defaultExpanded: true
};

export const LAYOUT_CONFIG = new InjectionToken<LayoutConfig>('layout.config');
