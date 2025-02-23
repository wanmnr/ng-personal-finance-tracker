// components/pagination/pagination.component.ts

import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { PaginationState, PaginationConfig } from '@shared/models/pagination.model';
import { PaginationService } from '@shared/services/pagination.service';
import * as PaginationSelectors from '@shared/store/selectors/pagination.selectors';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="flex items-center justify-between px-4 py-3 sm:px-6"
         role="navigation"
         aria-label="Pagination Navigation">

      <!-- Items per page selector -->
      <div class="flex items-center">
        <mat-select
          [value]="pageSize$ | async"
          (selectionChange)="onPageSizeChange($event.value)"
          class="w-20"
          aria-label="Items per page">
          @for (option of (config$ | async)?.itemsPerPageOptions; track option) {
            <mat-option [value]="option">
              {{ option }}
            </mat-option>
          }
        </mat-select>
        <span class="ml-2 text-sm text-gray-700">items per page</span>
      </div>

      <!-- Pagination controls -->
      <div class="flex items-center space-x-2">
        <!-- Previous button -->
        <button mat-icon-button
                [disabled]="(currentPage$ | async) === 1"
                (click)="onPreviousPage()"
                aria-label="Previous page">
          <fa-icon [icon]="faChevronLeft"></fa-icon>
        </button>

        <!-- Page numbers -->
        @for (page of displayedPages$ | async; track page) {
          <button mat-button
                  [class.bg-primary]="(currentPage$ | async) === page"
                  (click)="goToPage(page)"
                  [attr.aria-current]="(currentPage$ | async) === page ? 'page' : null"
                  [attr.aria-label]="'Go to page ' + page">
            {{ page }}
          </button>
        }

        <!-- Next button -->
        <button mat-icon-button
                [disabled]="(currentPage$ | async) === (totalPages$ | async)"
                (click)="onNextPage()"
                aria-label="Next page">
          <fa-icon [icon]="faChevronRight"></fa-icon>
        </button>
      </div>

      <!-- Page info -->
      <div class="text-sm text-gray-700">
        {{ (currentPage$ | async) }} of {{ (totalPages$ | async) }} pages
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
      @apply w-full;
    }

    .bg-primary {
      @apply bg-blue-600 text-white;
    }

    @media (max-width: 640px) {
      nav {
        @apply flex-col space-y-4;
      }
    }
  `]
})
export class PaginationComponent implements OnInit {
  @Input() config?: PaginationConfig;
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  currentPage$: Observable<number>;
  pageSize$: Observable<number>;
  totalItems$: Observable<number>;
  totalPages$: Observable<number>;
  config$: Observable<PaginationConfig>;
  displayedPages$: Observable<number[]>;

  constructor(
    private store: Store,
    private paginationService: PaginationService
  ) {
    this.currentPage$ = this.store.select(PaginationSelectors.selectCurrentPage);
    this.pageSize$ = this.store.select(PaginationSelectors.selectPageSize);
    this.totalItems$ = this.store.select(PaginationSelectors.selectTotalItems);
    this.totalPages$ = this.store.select(PaginationSelectors.selectTotalPages);
    this.config$ = this.paginationService.config$;

    // Calculate displayed pages based on current state
    this.displayedPages$ = this.store.select(PaginationSelectors.selectPaginationState).pipe(
      map(state => this.paginationService.calculateDisplayedPages(
        state.currentPage,
        state.totalPages
      ))
    );
  }

  ngOnInit(): void {
    if (this.config) {
      this.paginationService.updateConfig(this.config);
    }
  }

  /**
   * Handles page navigation
   * @param page - Target page number
   */
  goToPage(page: number): void {
    if (page) {
      this.paginationService.goToPage(page);
      this.pageChange.emit(page);
    }
  }

  /**
   * Handles page size changes
   * @param pageSize - New page size
   */
  onPageSizeChange(pageSize: number): void {
    this.paginationService.setPageSize(pageSize);
    this.pageSizeChange.emit(pageSize);
  }

  onPreviousPage(): void {
    this.currentPage$.subscribe(currentPage => {
      if (currentPage > 1) {
        this.goToPage(currentPage - 1);
      }
    }).unsubscribe();
  }

  onNextPage(): void {
    this.currentPage$.subscribe(currentPage => {
      this.totalPages$.subscribe(totalPages => {
        if (currentPage < totalPages) {
          this.goToPage(currentPage + 1);
        }
      }).unsubscribe();
    }).unsubscribe();
  }
}
