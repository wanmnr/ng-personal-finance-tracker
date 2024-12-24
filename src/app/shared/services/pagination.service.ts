// services/pagination.service.ts

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginationState, PaginationConfig } from '@shared/models/pagination.model';
import { PaginationActions } from '@shared/store/actions/pagination.actions';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private defaultConfig: PaginationConfig = {
    itemsPerPageOptions: [5, 10, 25, 50],
    defaultPageSize: 10,
    maxDisplayedPages: 5,
  };

  private configSubject = new BehaviorSubject<PaginationConfig>(this.defaultConfig);
  public config$ = this.configSubject.asObservable();

  constructor(private store: Store) { }

  /**
   * Updates pagination configuration
   * @param config - New pagination configuration
   */
  updateConfig(config: Partial<PaginationConfig>): void {
    this.configSubject.next({
      ...this.configSubject.value,
      ...config,
    });
  }

  /**
   * Calculates page numbers to display based on current state
   * @param currentPage - Current active page
   * @param totalPages - Total number of pages
   * @returns Array of page numbers to display
   */
  calculateDisplayedPages(currentPage: number, totalPages: number): number[] {
    const maxDisplayed = this.configSubject.value.maxDisplayedPages;
    const pages: number[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayed / 2));
    let endPage = Math.min(totalPages, startPage + maxDisplayed - 1);

    if (endPage - startPage + 1 < maxDisplayed) {
      startPage = Math.max(1, endPage - maxDisplayed + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  /**
   * Changes the current page
   * @param page - Page number to navigate to
   */
  goToPage(page: number): void {
    this.store.dispatch(PaginationActions.setCurrentPage({ page }));
  }

  /**
   * Updates the page size
   * @param pageSize - New page size
   */
  setPageSize(pageSize: number): void {
    this.store.dispatch(PaginationActions.setPageSize({ pageSize }));
  }
}
