// button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() primary = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() backgroundColor?: string;

  @Output() onClick = new EventEmitter<Event>();

  get classes(): string {
    return [
      'button',
      `button--${this.size}`,
      this.primary ? 'button--primary' : 'button--secondary',
    ].join(' ');
  }
}
