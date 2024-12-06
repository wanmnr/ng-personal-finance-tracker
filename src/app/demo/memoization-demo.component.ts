// memoization-DemoComponent.component.ts
import { Component } from '@angular/core';
import { MemoizedPipe } from '../shared/pipes/performance-optimized.pipe';

@Component({
  selector: 'app-memoization-demo',
  template: `
    <div>Original: {{ number }}</div>
    <div>Memoized Result: {{ number | memoized }}</div>
    <button (click)="updateNumber()">Update Number</button>
  `,
  standalone: true,
  imports: [MemoizedPipe]
})
export class MemoizationDemonstrationComponent {  // Changed to full word 'Demonstration'
  number = 5;

  updateNumber() {
    // If we set the same value, the pipe won't recalculate
    this.number = 5;

    // If we set a different value, it will perform the calculation
    // this.number = 6;
  }
}
