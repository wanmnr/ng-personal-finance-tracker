// shared/services/card.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CardState {
  isLoading: boolean;
  error: string | null;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private state = new BehaviorSubject<CardState>({
    isLoading: false,
    error: null,
    data: null
  });

  getState(): Observable<CardState> {
    return this.state.asObservable();
  }

  updateState(newState: Partial<CardState>): void {
    this.state.next({
      ...this.state.value,
      ...newState
    });
  }

  resetState(): void {
    this.state.next({
      isLoading: false,
      error: null,
      data: null
    });
  }
}
