// progress-bar.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    <div class="progress-container">
      <span class="stage-label">{{ stage }}</span>
      <mat-progress-bar [mode]="'determinate'" [value]="value" color="primary">
      </mat-progress-bar>
      <span class="progress-value">{{ value }}%</span>
    </div>
  `,
  styles: [
    `
      .progress-container {
        padding: 1rem;
        background: white;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .stage-label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
      .progress-value {
        display: block;
        text-align: right;
        margin-top: 0.25rem;
        font-size: 0.875rem;
        color: rgba(0, 0, 0, 0.6);
      }
    `,
  ],
})
export class ProgressBarComponent {
  @Input() stage: string = '';
  @Input() value: number = 0;
}
