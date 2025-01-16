// interfaces/nav-item.interface.ts
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface NavItem {
  path: string;
  label: string;
  icon: IconDefinition;
}
