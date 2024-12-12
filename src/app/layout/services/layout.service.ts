// layout.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { layoutActions } from '../store/layout.state';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  constructor(private store: Store) { }

  toggleSidenav(open: boolean) {
    this.store.dispatch(layoutActions.toggleSidenav({ open }));
  }

  setTheme(theme: 'light' | 'dark') {
    this.store.dispatch(layoutActions.setTheme({ theme }));
  }
}
