// @shared/components/modal.component.ts

import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChild,
  ComponentRef,
  ViewContainerRef,
  ElementRef,
  HostListener,
  Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { ModalService, ModalConfig } from '../../services/modal.service';

/**
 * Reusable Modal Component
 * @class ModalComponent
 * @implements OnInit, OnDestroy
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FontAwesomeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="isVisible"
      class="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      [attr.aria-label]="config?.title"
      [attr.aria-modal]="true">

      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        (click)="onBackdropClick()">
      </div>

      <!-- Modal Content -->
      <div
        #modalContent
        [ngClass]="modalSizeClass"
        class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all max-h-[90vh] overflow-hidden">

        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ config?.title }}
            </h2>
            <button
              mat-icon-button
              (click)="close()"
              aria-label="Close modal"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <fa-icon [icon]="closeIcon"></fa-icon>
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="px-6 py-4 overflow-y-auto">
          <!-- Dynamic Component Container -->
          <ng-container #dynamicComponentContainer></ng-container>

          <!-- Static Content -->
          <ng-container *ngIf="!config?.component">
            <p class="text-gray-700 dark:text-gray-300">{{ config?.content }}</p>
          </ng-container>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <ng-content select="[modal-footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }

    .modal-sm { @apply max-w-md w-full; }
    .modal-md { @apply max-w-lg w-full; }
    .modal-lg { @apply max-w-xl w-full; }
    .modal-xl { @apply max-w-2xl w-full; }
    .modal-full { @apply max-w-[90vw] w-full; }
  `]
})
export class ModalComponent implements OnInit, OnDestroy {
  /** Reference to dynamic component container */
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  containerRef!: ViewContainerRef;

  /** Reference to modal content for focus trap */
  @ViewChild('modalContent') modalContent!: ElementRef;

  /** Font Awesome close icon */
  readonly closeIcon = faXmark;

  /** Current modal configuration */
  config: ModalConfig | null = null;

  /** Modal visibility state */
  isVisible = false;

  /** Subject for cleaning up subscriptions */
  private readonly destroy$ = new Subject<void>();

  /** Dynamic component reference */
  private componentRef: ComponentRef<any> | null = null;

  constructor(
    private modalService: ModalService,
    private renderer: Renderer2
  ) { }

  /**
   * Lifecycle hook - component initialization
   */
  ngOnInit(): void {
    // Subscribe to modal service observables
    this.modalService.isVisible$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isVisible => {
        this.isVisible = isVisible;
        if (isVisible) {
          this.setupFocusTrap();
        }
      });

    this.modalService.config$
      .pipe(takeUntil(this.destroy$))
      .subscribe(config => {
        this.config = config;
        if (config?.component) {
          this.loadDynamicComponent(config.component, config.data);
        }
      });
  }

  /**
   * Computes modal size class based on configuration
   */
  get modalSizeClass(): string {
    return `modal-${this.config?.size || 'md'}`;
  }

  /**
   * Handles backdrop click
   */
  onBackdropClick(): void {
    if (!this.config?.disableClose) {
      this.close();
    }
  }

  /**
   * Closes the modal
   */
  close(): void {
    this.modalService.close();
    this.cleanupDynamicComponent();
  }

  /**
   * Handles escape key press
   */
  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (!this.config?.disableClose) {
      this.close();
    }
  }

  /**
   * Loads dynamic component into the modal
   */
  private loadDynamicComponent(component: any, data?: any): void {
    if (this.containerRef) {
      this.cleanupDynamicComponent();
      this.componentRef = this.containerRef.createComponent(component);

      if (data) {
        Object.assign(this.componentRef.instance, data);
      }
    }
  }

  /**
   * Cleans up dynamic component
   */
  private cleanupDynamicComponent(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  /**
   * Sets up focus trap within modal
   */
  private setupFocusTrap(): void {
    if (this.modalContent) {
      const focusableElements = this.modalContent.nativeElement
        .querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

      if (focusableElements.length) {
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        this.renderer.listen(lastFocusable, 'keydown.tab', (event: KeyboardEvent) => {
          if (!event.shiftKey) {
            firstFocusable.focus();
            event.preventDefault();
          }
        });

        this.renderer.listen(firstFocusable, 'keydown.tab', (event: KeyboardEvent) => {
          if (event.shiftKey) {
            lastFocusable.focus();
            event.preventDefault();
          }
        });

        firstFocusable.focus();
      }
    }
  }

  /**
   * Lifecycle hook - component destruction
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.cleanupDynamicComponent();
  }
}
