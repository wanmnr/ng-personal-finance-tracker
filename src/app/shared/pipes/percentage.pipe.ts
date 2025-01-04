// shared/percentage.pipe.ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'percentage',
  standalone: true
})
export class PercentagePipe implements PipeTransform {
  transform(value: number, decimals: number = 2): string {
    if (isNaN(value)) return '0%';
    return (value * 100).toFixed(decimals) + '%';
  }
}
