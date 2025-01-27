// src/app/constants/navigation.constants.ts
import {
  faHome,
  faChartLine,
  faUsers,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { NavigationItem } from '@app/layout/types/navigation.types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Dashboard', route: '/dashboard', icon: faHome },
  { label: 'Analytics', route: '/analytics', icon: faChartLine },
  { label: 'Users', route: '/users', icon: faUsers },
  { label: 'Settings', route: '/settings', icon: faGear },
];
