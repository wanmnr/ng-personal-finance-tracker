// store/settings.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { SettingsActions } from './settings.actions';
import { initialSettingsState, SettingsState } from './state/settings.state';

export const settingsReducer = createReducer(
  initialSettingsState,
  on(SettingsActions.updateTheme, (state, { theme }): SettingsState => ({
    ...state,
    theme
  })),
  on(SettingsActions.toggleNotifications, (state, { enabled }): SettingsState => ({
    ...state,
    notifications: enabled
  })),
  on(SettingsActions.changeLanguage, (state, { language }): SettingsState => ({
    ...state,
    language
  })),
  on(SettingsActions.updateFontSize, (state, { size }): SettingsState => ({
    ...state,
    fontSize: size
  })),
  on(SettingsActions.updateAccessibility, (state, { highContrast, screenReader }): SettingsState => ({
    ...state,
    accessibility: {
      highContrast,
      screenReader
    }
  })),
  on(SettingsActions.loadSettings, (_, { settings }): SettingsState => settings)
);
