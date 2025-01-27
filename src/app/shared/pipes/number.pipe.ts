// pipes/number.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'number',
  standalone: true,
})
export class NumberPipe implements PipeTransform {
  transform(value: number, digitsInfo?: string): string {
    if (!value && value !== 0) return '';

    try {
      // Parse digitsInfo format 'minIntegerDigits.minFractionDigits-maxFractionDigits'
      let minIntegerDigits = 1;
      let minFractionDigits = 0;
      let maxFractionDigits = 0;

      if (digitsInfo) {
        const parts = digitsInfo.split('-');
        const intAndMinFraction = parts[0].split('.');

        if (intAndMinFraction[0]) {
          minIntegerDigits = parseInt(intAndMinFraction[0]);
        }

        if (intAndMinFraction[1]) {
          minFractionDigits = parseInt(intAndMinFraction[1]);
        }

        if (parts[1]) {
          maxFractionDigits = parseInt(parts[1]);
        } else {
          maxFractionDigits = minFractionDigits;
        }
      }

      return new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: minIntegerDigits,
        minimumFractionDigits: minFractionDigits,
        maximumFractionDigits: maxFractionDigits,
      }).format(value);
    } catch (error) {
      console.error('Error formatting number:', error);
      return value.toString();
    }
  }
}
