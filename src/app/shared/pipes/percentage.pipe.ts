// shared/percentage.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface PercentageOptions {
  decimals?: number;
  locale?: string;
  fallback?: string;
  useDecimalPipe?: boolean;
}

@Pipe({
  name: 'percentage',
  standalone: true,
  pure: true
})
export class PercentagePipe implements PipeTransform {
  private readonly DEFAULT_OPTIONS: Required<PercentageOptions> = {
    decimals: 2,
    locale: 'en-US',
    fallback: '0%',
    useDecimalPipe: false
  };

  constructor(private decimalPipe: DecimalPipe) {}

  transform(
    value: number | null | undefined,
    options?: PercentageOptions
  ): string {
    const opts = { ...this.DEFAULT_OPTIONS, ...options };

    // Input validation
    if (value === null || value === undefined || !Number.isFinite(value)) {
      return opts.fallback;
    }

    // Ensure decimals is valid
    const validDecimals = Math.max(0, Math.min(20, Math.floor(opts.decimals)));

    try {
      if (opts.useDecimalPipe) {
        // Using Angular's DecimalPipe
        const percentage = value * 100;
        return `${this.decimalPipe.transform(
          percentage,
          `1.${validDecimals}-${validDecimals}`,
          opts.locale
        )}%`;
      } else {
        // Using Intl.NumberFormat
        return new Intl.NumberFormat(opts.locale, {
          style: 'percent',
          minimumFractionDigits: validDecimals,
          maximumFractionDigits: validDecimals
        }).format(value);
      }
    } catch (error) {
      console.error('Error formatting percentage:', error);
      return opts.fallback;
    }
  }
}
