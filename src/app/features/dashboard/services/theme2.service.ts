// src/app/features/dashboard/services/theme2.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$: Observable<boolean> = this.darkModeSubject.asObservable();

  toggleDarkMode(): void {
    this.darkModeSubject.next(!this.darkModeSubject.value);
  }
}
