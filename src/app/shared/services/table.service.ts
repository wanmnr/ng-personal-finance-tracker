// services/table.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableState } from '../types/table.interface';

/**
 * Service for managing table state and operations
 * @class TableService
 */
@Injectable({
  providedIn: 'root'
})
export class TableService {
  /** Initial table state */
  private initialState: TableState = {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    sortDirection: '',
    sortColumn: '',
    loading: false,
    selectedItems: [],
    data: []
  };

  /** BehaviorSubject for table state */
  private tableState$ = new BehaviorSubject<TableState>(this.initialState);

  /**
   * Updates the table state
   * @param state - Partial table state to update
   */
  updateState(state: Partial<TableState>): void {
    this.tableState$.next({
      ...this.tableState$.value,
      ...state
    });
  }

  /**
   * Gets the current table state as an observable
   * @returns Observable<TableState>
   */
  getState(): Observable<TableState> {
    return this.tableState$.asObservable();
  }

  /**
   * Resets the table state to initial values
   */
  resetState(): void {
    this.tableState$.next(this.initialState);
  }
}
