// src/app/layout/types/navigation.types.ts

import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface NavigationItem {
  label: string;
  route: string;
  icon: IconDefinition;
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  hover: string;
}
