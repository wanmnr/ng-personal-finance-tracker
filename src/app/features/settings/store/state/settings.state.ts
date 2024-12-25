// store/state/settings.state.ts
export interface SettingsState {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
  fontSize: number;
  accessibility: {
    highContrast: boolean;
    screenReader: boolean;
  };
}

export const initialSettingsState: SettingsState = {
  theme: 'light',
  notifications: true,
  language: 'en',
  fontSize: 16,
  accessibility: {
    highContrast: false,
    screenReader: false,
  }
};
