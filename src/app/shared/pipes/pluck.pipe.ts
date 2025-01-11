// pluck.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluck',
  standalone: true
})
export class PluckPipe implements PipeTransform {
  transform<T>(array: T[], key: keyof T): any[] {
    return array.map(item => item[key]);
  }
}

// PluckPipe usage:

// In your component template
// <ng-container *ngIf="transactions">
//   <canvas [data]="transactions | pluck:'amount'" />
// </ng-container>
