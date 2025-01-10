// core/interfaces/nav-item.interface.ts
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface NavItem {
  path: string;
  label: string;
  icon: IconDefinition;
  permissions?: string[];
  children?: NavItem[];
  divider?: boolean;
}
