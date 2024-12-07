// app/core/services/navigation1.service.ts
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly sidenavState = signal<boolean>(false);
  private readonly navigationState = new BehaviorSubject<boolean>(true);
  private readonly breadcrumbs = signal<string[]>([]);

  toggleSidenav(): void {
    this.sidenavState.update(state => !state);
  }

  getSidenavState(): boolean {
    return this.sidenavState();
  }

  getNavigationState(): Observable<boolean> {
    return this.navigationState.asObservable();
  }

  setNavigationVisibility(isVisible: boolean): void {
    this.navigationState.next(isVisible);
  }

  updateBreadcrumbs(path: string[]): void {
    this.breadcrumbs.set(path);
  }

  getBreadcrumbs(): string[] {
    return this.breadcrumbs();
  }
}
