// percentage.pipe.specs.ts

import { TestBed } from '@angular/core/testing';
import { DecimalPipe } from '@angular/common';
import { PercentagePipe } from './percentage.pipe';

describe('PercentagePipe', () => {
  let pipe: PercentagePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DecimalPipe],
    });
    pipe = new PercentagePipe(TestBed.inject(DecimalPipe));
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should handle basic percentage', () => {
    expect(pipe.transform(0.1234)).toBe('12.34%');
  });

  it('should handle null/undefined', () => {
    expect(pipe.transform(null)).toBe('0%');
    expect(pipe.transform(undefined)).toBe('0%');
  });

  it('should handle custom decimals', () => {
    expect(pipe.transform(0.1234, { decimals: 1 })).toBe('12.3%');
  });

  it('should handle different locales', () => {
    expect(pipe.transform(0.1234, { locale: 'de-DE' })).toBe('12,34 %');
  });

  it('should handle decimal pipe option', () => {
    expect(pipe.transform(0.1234, { useDecimalPipe: true })).toBe('12.34%');
  });

  it('should handle custom fallback', () => {
    expect(pipe.transform(NaN, { fallback: 'N/A' })).toBe('N/A');
  });
});
