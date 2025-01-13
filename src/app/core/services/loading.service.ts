// src/app/core/services/loading.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  setLoading(loading: boolean): void {
    this.isLoadingSubject.next(loading);
  }

  getLoading(): boolean {
    return this.isLoadingSubject.value;
  }
}
