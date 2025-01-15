// shared/percentage.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

/**
 * @description
 * A versatile pipe that formats numbers as percentages with various configuration options.
 * Supports internationalization, custom decimal places, and different formatting strategies.
 *
 * @usageNotes
 *
 * Basic usage:
 * ```html
 * {{ 0.1234 | percentage }}
 * <!-- Output: "12.34%" -->
 * ```
 *
 * With custom decimals:
 * ```html
 * {{ 0.1234 | percentage: { decimals: 1 } }}
 * <!-- Output: "12.3%" -->
 * ```
 *
 * With locale:
 * ```html
 * {{ 0.1234 | percentage: { locale: 'fr-FR' } }}
 * <!-- Output: "12,34 %" -->
 * ```
 *
 * Using Angular's DecimalPipe:
 * ```html
 * {{ 0.1234 | percentage: { useDecimalPipe: true } }}
 * <!-- Output: "12.34%" -->
 * ```
 *
 * Custom fallback for invalid values:
 * ```html
 * {{ invalidValue | percentage: { fallback: 'N/A' } }}
 * <!-- Output: "N/A" -->
 * ```
 *
 * @publicApi
 */
export interface PercentageOptions {
  /** Number of decimal places (0-20). Default is 2. */
  decimals?: number;
  /** Locale for number formatting. Default is 'en-US'. */
  locale?: string;
  /** Fallback value for invalid inputs. Default is '0%'. */
  fallback?: string;
  /** Use Angular's DecimalPipe instead of Intl.NumberFormat. Default is false. */
  useDecimalPipe?: boolean;
}

@Pipe({
  name: 'percentage',
  standalone: true,
  pure: true,
})
export class PercentagePipe implements PipeTransform {
  private readonly DEFAULT_OPTIONS: Required<PercentageOptions> = {
    decimals: 2,
    locale: 'en-US',
    fallback: '0%',
    useDecimalPipe: false,
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
          maximumFractionDigits: validDecimals,
        }).format(value);
      }
    } catch (error) {
      console.error('Error formatting percentage:', error);
      return opts.fallback;
    }
  }
}
