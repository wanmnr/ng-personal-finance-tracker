// services/settings.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SettingsState } from '../store/state/settings.state';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly API_ENDPOINT = 'api/settings';

  constructor(private http: HttpClient) { }

  /**
   * Fetches user settings from the backend
   * @returns Observable of SettingsState
   */
  getSettings(): Observable<SettingsState> {
    return this.http.get<SettingsState>(this.API_ENDPOINT);
  }

  /**
   * Saves user settings to the backend
   * @param settings - The settings to save
   * @returns Observable of SettingsState
   */
  saveSettings(settings: SettingsState): Observable<SettingsState> {
    return this.http.put<SettingsState>(this.API_ENDPOINT, settings);
  }
}
