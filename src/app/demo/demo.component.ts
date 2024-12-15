// demo.component.ts
import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';
import { TooltipDirective } from '@shared/directives/tooltip.directive';


@Component({
  selector: 'app-demo',
  standalone: true,
  template: `
    <app-button buttonClass="primary-button" [appTooltip]="'Button Tooltip!'">
      Click Me
    </app-button>
    <br><br>
    <p [appTooltip]="'Button Tooltip!'">Testing</p>
  `,
  styles: [`
    :host ::ng-deep .tooltip {
      position: fixed;
      background-color: black;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 14px;
      z-index: 1000;
    }
  `],
  imports: [ButtonComponent, TooltipDirective],
})
export class DemoComponent { }
