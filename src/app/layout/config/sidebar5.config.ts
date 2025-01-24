// app/core/layout/sidebar/sidebar-config.model.ts

import { IconDefinition } from '@fortawesome/angular-fontawesome';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: IconDefinition;
  route?: string;
  children?: SidebarItem[];
  permissions?: string[];
  badge?: {
    text: string;
    color: string;
  };
}
