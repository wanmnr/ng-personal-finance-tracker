// date-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance, format, parseISO } from 'date-fns';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    const date = typeof value === 'string' ? parseISO(value) : value;
    return formatDistance(date, new Date(), { addSuffix: true });
  }
}

@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string | Date, formatString: string = 'PP'): string {
    if (!value) return '';

    const date = typeof value === 'string' ? parseISO(value) : value;
    return format(date, formatString);
  }
}
