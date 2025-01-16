// demo/pipes/percentage-demo.component.ts

import { Component } from '@angular/core';
import { PercentagePipe } from '@shared/pipes/percentage.pipe';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-percentage-demo',
  standalone: true,
  imports: [PercentagePipe, JsonPipe],
  template: `
    <div class="demo-container">
      <h2>Percentage Pipe Demo</h2>

      <section class="example-section">
        <h3>Basic Usage</h3>
        <pre>{{ 0.1234 | percentage }}</pre>
      </section>

      <section class="example-section">
        <h3>Custom Decimals</h3>
        <pre>{{ 0.1234 | percentage : { decimals: 1 } }}</pre>
      </section>

      <section class="example-section">
        <h3>Localization</h3>
        <pre>{{ 0.1234 | percentage : { locale: 'fr-FR' } }}</pre>
      </section>

      <section class="example-section">
        <h3>Invalid Input Handling</h3>
        <pre>{{ invalidValue | percentage : { fallback: 'N/A' } }}</pre>
      </section>

      <section class="example-section">
        <h3>Debug Information</h3>
        <pre>{{ { value: invalidValue } | json }}</pre>
      </section>
    </div>
  `,
  styles: [
    `
      .demo-container {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }
      .example-section {
        margin: 20px 0;
        padding: 20px;
        border: 1px solid #eee;
        border-radius: 4px;
      }
      pre {
        background: #f5f5f5;
        padding: 10px;
        border-radius: 4px;
      }
    `,
  ],
})
export class PercentageDemoComponent {
  invalidValue = NaN;
}
