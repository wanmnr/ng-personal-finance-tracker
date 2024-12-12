// currency.pipe.ts
import { Pipe, PipeTransform, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Pipe({
  name: 'currency',
  standalone: true
})
export class CurrencyPipe implements PipeTransform {
  private store = inject(Store);

  transform(value: number): string {
    // Use store selectors for currency format
    return value.toString();
  }
}
