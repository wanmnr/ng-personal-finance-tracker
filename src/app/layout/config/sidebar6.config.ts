// app/layout/sidebar/sidebar6.config.ts
// Responsive Sidebar with Theme Support

export interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  hover: string;
}

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
