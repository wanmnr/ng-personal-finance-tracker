// error-handling.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeParse',
  standalone: true
})
export class SafeParsePipe implements PipeTransform {
  transform(value: string, fallback: any = null): any {
    try {
      return JSON.parse(value);
    } catch (error) {
      if (error instanceof Error) {
        console.warn(`Error parsing value: ${error.message}`);
      } else {
        console.warn('Error parsing value');
      }
      return fallback;
    }
  }
}
