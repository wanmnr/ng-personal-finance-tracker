// @shared/pipes/myr-currency.pipe.ts
import { Pipe, PipeTransform, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Pipe({
  name: 'myrCurrency',
  standalone: true
})
export class MYRCurrencyPipe implements PipeTransform {
  private store = inject(Store);

  transform(value: number, showSymbol: boolean = true, decimals: number = 2): string {
    if (isNaN(value)) {
      return ''; // Return empty string for invalid numbers
    }

    // Format the number with proper decimal places
    const formattedValue = value.toFixed(decimals);

    // Add thousand separators
    const parts = formattedValue.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine the parts with decimal point
    const numberWithCommas = parts.join('.');

    // Add MYR symbol if showSymbol is true
    return showSymbol ? `RM ${numberWithCommas}` : numberWithCommas;
  }
}
