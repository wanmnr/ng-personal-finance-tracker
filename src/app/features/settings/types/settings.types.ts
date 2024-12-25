// types/settings.types.ts
export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
}

export interface NotificationConfig {
  email: boolean;
  push: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
}

export interface AccessibilityConfig {
  highContrast: boolean;
  screenReader: boolean;
  reducedMotion: boolean;
  fontSize: number;
}
