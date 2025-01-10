// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('light');
  theme$ = this.themeSubject.asObservable();

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }
}
