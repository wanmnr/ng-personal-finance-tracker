import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

interface UserPreferences {
  theme: string;
  language: string;
  notifications: boolean;
  // Add other preference properties as needed
}

// preferences.service.ts
@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  constructor(private storageService: StorageService) { }

  private readonly PREFERENCES_KEY = 'preferences';

  savePreferences(preferences: UserPreferences): void {
    this.storageService.setItem(this.PREFERENCES_KEY, preferences);
  }

  getPreferences(): UserPreferences | null {
    return this.storageService.getItem<UserPreferences>(this.PREFERENCES_KEY);
  }
}
