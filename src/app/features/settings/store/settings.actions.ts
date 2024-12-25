// store/settings.actions.ts
import { createActionGroup, props } from '@ngrx/store';
import { SettingsState } from './state/settings.state';

export const SettingsActions = createActionGroup({
  source: 'Settings',
  events: {
    'Update Theme': props<{ theme: SettingsState['theme'] }>(),
    'Toggle Notifications': props<{ enabled: boolean }>(),
    'Change Language': props<{ language: string }>(),
    'Update Font Size': props<{ size: number }>(),
    'Update Accessibility': props<{
      highContrast: boolean;
      screenReader: boolean;
    }>(),
    'Load Settings': props<{ settings: SettingsState }>(),
    'Save Settings': props<{ settings: SettingsState }>(),
  }
});
