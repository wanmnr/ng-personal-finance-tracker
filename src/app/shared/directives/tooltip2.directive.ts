// shared/directives/tooltip2.directive.ts
import { Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appTooltip]',
  standalone: true  // Add standalone: true
})
export class TooltipDirective {
  @Input('appTooltip')
  tooltipText!: string;

  private tooltip: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    if (this.tooltip) {
      return;
    }

    this.tooltip = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltip, 'tooltip');
    const text = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(this.tooltip, text);
    this.renderer.appendChild(document.body, this.tooltip);

    // Position the tooltip
    const hostPos = this.el.nativeElement.getBoundingClientRect();

    if (this.tooltip) { // Null check is needed here
      const tooltipPos = this.tooltip.getBoundingClientRect();

      // Calculate position
      let top = hostPos.top - tooltipPos.height - 10;
      const left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;

      // Check if tooltip would go above viewport
      if (top < 0) {
        // Position below the element instead
        top = hostPos.bottom + 10;
      }

      this.renderer.setStyle(this.tooltip, 'top', `${top}px`);
      this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
    }
  }

  private hideTooltip() {
    if (this.tooltip) {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }
  }
}
