// custom-date.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { format, parseISO } from 'date-fns';

@Pipe({
  name: 'customDate',
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string | Date, formatString: string = 'PP'): string {
    if (!value) return '';

    const date = typeof value === 'string' ? parseISO(value) : value;
    return format(date, formatString);
  }
}
