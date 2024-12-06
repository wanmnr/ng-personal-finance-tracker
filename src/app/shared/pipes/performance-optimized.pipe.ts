// performance-optimized.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memoized',
  standalone: true
})
export class MemoizedPipe implements PipeTransform {
  private lastValue: any;
  private lastResult: any;

  transform(value: any): any {
    if (value === this.lastValue) {
      return this.lastResult;
    }

    this.lastValue = value;
    this.lastResult = this.expensiveCalculation(value);
    return this.lastResult;
  }

  private expensiveCalculation(value: number): number {
    // Simulate expensive operation
    console.log('Performing expensive calculation');
    return value * value * value;
  }
}
