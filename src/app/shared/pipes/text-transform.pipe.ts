// text-transform.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 100, completeWords: boolean = false, ellipsis: string = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;

    if (completeWords) {
      let truncated = value.substring(0, limit);
      let lastSpace = truncated.lastIndexOf(' ');
      return truncated.substring(0, lastSpace) + ellipsis;
    }

    return value.substring(0, limit) + ellipsis;
  }
}

@Pipe({
  name: 'capitalize',
  standalone: true
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string, mode: 'first' | 'all' = 'first'): string {
    if (!value) return '';

    if (mode === 'first') {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    return value.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
