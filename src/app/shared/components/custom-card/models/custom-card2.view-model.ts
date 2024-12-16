// shared/components/custom-card/custom-card.view-model.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CustomCardInputs } from './custom-card2.types';
import { CARD_DEFAULTS } from './custom-card2.constants';

@Injectable()
export class CustomCardViewModel {
  private _state = new BehaviorSubject<CustomCardInputs>({
    title: '',
    theme: CARD_DEFAULTS.THEME,
    size: CARD_DEFAULTS.SIZE,
    elevation: CARD_DEFAULTS.ELEVATION,
    loading: false,
    error: null
  });

  // Expose state as readonly observable
  readonly state$ = this._state.asObservable();

  readonly containerClasses$: Observable<string> = this._state.pipe(
    map(state => this.computeContainerClasses(state))
  );

  private computeContainerClasses(state: CustomCardInputs): string {
    return `
      card-${state.size}
      theme-${state.theme}
      ${state.loading ? 'loading' : ''}
      ${state.error ? 'error' : ''}
      ${state.containerClass || ''}
    `.trim();
  }

  updateState(newState: Partial<CustomCardInputs>): void {
    this._state.next({ ...this._state.value, ...newState });
  }
}
