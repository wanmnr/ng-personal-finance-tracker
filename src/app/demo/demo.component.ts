// demo.component.ts
import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-demo',
  standalone: true,
  template: `
    <app-button buttonClass="primary-button">
      Click Me
    </app-button>
  `,
  imports: [SharedModule],
})
export class DemoComponent { }
