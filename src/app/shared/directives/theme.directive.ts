// theme.directive.ts
import { Directive, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Directive({
  selector: '[appTheme]',
  standalone: true
})
export class ThemeDirective {
  private store = inject(Store);
  // Use store selectors to apply theme
}
