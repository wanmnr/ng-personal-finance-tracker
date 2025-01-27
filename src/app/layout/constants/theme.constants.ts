// src/app/layout/constants/theme.constants.ts
import { ThemeConfig } from '@app/layout/types/navigation.types';

export const THEMES: Record<string, ThemeConfig> = {
  dark: {
    primary: 'bg-gray-800',
    secondary: 'bg-gray-700',
    background: 'bg-gray-900',
    text: 'text-white',
    hover: 'hover:bg-gray-600',
  },
  light: {
    primary: 'bg-white',
    secondary: 'bg-gray-100',
    background: 'bg-gray-50',
    text: 'text-gray-800',
    hover: 'hover:bg-gray-200',
  },
};
