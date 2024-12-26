// store/settings.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { SettingsActions } from './settings.actions';
import { SettingsService } from '../services/settings.service';

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private settingsService: SettingsService
  ) { }

  /**
   * Effect to save settings to backend when they change
   */
  saveSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        SettingsActions.updateTheme,
        SettingsActions.toggleNotifications,
        SettingsActions.updateAccessibility
      ),
      mergeMap(() =>
        this.settingsService.getSettings().pipe(
          mergeMap(settings =>
            this.settingsService.saveSettings(settings).pipe(
              map(savedSettings =>
                SettingsActions.loadSettings({ settings: savedSettings })
              ),
              catchError(() => of({ type: '[Settings] Save Error' }))
            )
          )
        )
      )
    )
  );
}
