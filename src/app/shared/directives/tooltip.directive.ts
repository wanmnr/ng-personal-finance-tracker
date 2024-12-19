// shared/directives/tooltip.directive.ts

import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
  ComponentRef,
  ViewContainerRef,
  HostListener,
  inject,
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
  OverlayPositionBuilder
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  BehaviorSubject,
  Subject,
  fromEvent,
  merge
} from 'rxjs';
import {
  takeUntil,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';
import { TooltipComponent } from '@shared/components/tooltip/tooltip.component';
import {
  TooltipPosition,
  TooltipTheme,
  TooltipConfig
} from '@shared/types/tooltip.types';

/**
 * @description
 * A directive that creates an accessible tooltip with customizable content,
 * position, and theme. Implements WCAG 2.1 guidelines and responsive behavior.
 *
 * @usageNotes
 * ```html
 * <button
 *   appTooltip="Helpful information"
 *   tooltipPosition="top"
 *   tooltipTheme="dark"
 *   [tooltipDisabled]="false">
 *   Hover me
 * </button>
 * ```
 */
@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnInit, OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly overlayPositionBuilder = inject(OverlayPositionBuilder);
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly viewContainerRef = inject(ViewContainerRef);

  // Private properties for internal state management
  private overlayRef: OverlayRef | null = null;
  private tooltipRef: ComponentRef<TooltipComponent> | null = null;
  private readonly destroy$ = new Subject<void>();
  private readonly content$ = new BehaviorSubject<string>('');

  // Input decorators with default values
  @Input({ required: true }) set appTooltip(value: string) {
    this.content$.next(value);
  }

  @Input() tooltipPosition: TooltipPosition = 'top';
  @Input() tooltipTheme: TooltipTheme = 'dark';
  @Input() tooltipDisabled = false;
  @Input() tooltipShowDelay = 200;
  @Input() tooltipHideDelay = 100;

  /**
   * Lifecycle hook that initializes the tooltip functionality
   * and sets up necessary subscriptions
   */
  ngOnInit(): void {
    if (!this.tooltipDisabled) {
      this.setupAccessibility();
      this.setupContentSubscription();
    }
  }

  /**
   * Lifecycle hook that performs cleanup when the directive is destroyed
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroyTooltip();
  }

  /**
   * Event handler for mouse enter event
   * Shows the tooltip with a specified delay
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.tooltipDisabled) {
      setTimeout(() => this.show(), this.tooltipShowDelay);
    }
  }

  /**
   * Event handler for mouse leave event
   * Hides the tooltip with a specified delay
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.tooltipDisabled) {
      setTimeout(() => this.hide(), this.tooltipHideDelay);
    }
  }

  /**
   * Sets up ARIA attributes for accessibility
   */
  private setupAccessibility(): void {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'aria-describedby',
      'tooltip'
    );
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'role',
      'button'
    );
  }

  /**
   * Sets up subscription to content changes
   */
  private setupContentSubscription(): void {
    this.content$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(100),
        distinctUntilChanged()
      )
      .subscribe(content => {
        if (this.tooltipRef) {
          this.tooltipRef.instance.content = content;
        }
      });
  }

  /**
   * Creates and shows the tooltip
   */
  private show(): void {
    if (this.overlayRef) {
      return;
    }

    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions(this.getPositions());

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: ['tooltip-panel', `tooltip-${this.tooltipTheme}`],
    });

    const tooltipPortal = new ComponentPortal(
      TooltipComponent,
      this.viewContainerRef
    );
    this.tooltipRef = this.overlayRef.attach(tooltipPortal);

    // Configure tooltip component
    if (this.tooltipRef) {
      this.tooltipRef.instance.content = this.content$.getValue();
      this.tooltipRef.instance.position = this.tooltipPosition;
      this.tooltipRef.instance.theme = this.tooltipTheme;
    }

    // Handle click outside
    this.setupOutsideClickListener();
  }

  /**
   * Sets up listener for clicks outside the tooltip
   */
  private setupOutsideClickListener(): void {
    if (this.overlayRef) {
      merge(
        fromEvent<MouseEvent>(document, 'click'),
        fromEvent<TouchEvent>(document, 'touchend')
      )
        .pipe(takeUntil(this.destroy$))
        .subscribe((event: MouseEvent | TouchEvent) => {
          const clickTarget = event.target as HTMLElement;
          const tooltipElement = this.tooltipRef?.location.nativeElement;
          const hostElement = this.elementRef.nativeElement;

          if (
            clickTarget !== hostElement &&
            clickTarget !== tooltipElement &&
            !tooltipElement?.contains(clickTarget)
          ) {
            this.hide();
          }
        });
    }
  }

  /**
   * Hides and destroys the tooltip
   */
  private hide(): void {
    this.destroyTooltip();
  }

  /**
   * Cleans up tooltip resources
   */
  private destroyTooltip(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    if (this.tooltipRef) {
      this.tooltipRef.destroy();
      this.tooltipRef = null;
    }
  }

  /**
   * Gets the positions for the tooltip based on the specified position
   */
  private getPositions() {
    const positions: any[] = [];
    const primaryPosition = this.getPositionConfig(this.tooltipPosition);
    const fallbackPositions = ['top', 'right', 'bottom', 'left'].filter(
      pos => pos !== this.tooltipPosition
    );

    positions.push(primaryPosition);
    fallbackPositions.forEach(pos => {
      positions.push(this.getPositionConfig(pos as TooltipPosition));
    });

    return positions;
  }

  /**
   * Gets the position configuration for a specific position
   */
  private getPositionConfig(position: TooltipPosition) {
    const config: any = {
      originX: 'center',
      originY: 'center',
      overlayX: 'center',
      overlayY: 'center',
    };

    switch (position) {
      case 'top':
        config.originY = 'top';
        config.overlayY = 'bottom';
        break;
      case 'right':
        config.originX = 'end';
        config.overlayX = 'start';
        break;
      case 'bottom':
        config.originY = 'bottom';
        config.overlayY = 'top';
        break;
      case 'left':
        config.originX = 'start';
        config.overlayX = 'end';
        break;
    }

    return config;
  }
}
