// percentage-demo.stories.ts

import { Meta, StoryObj } from '@storybook/angular';
import { PercentageDemoComponent } from './percentage-demo.component';

const meta: Meta<PercentageDemoComponent> = {
  title: 'Pipes/Percentage',
  component: PercentageDemoComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          # Percentage Pipe

          A versatile Angular pipe for formatting numbers as percentages with support for:
          - Custom decimal places
          - Internationalization (i18n)
          - Fallback values for invalid inputs

          ## Installation
          The pipe is available as a standalone component:
          \`\`\`typescript
          import { PercentagePipe } from '@shared/pipes/percentage.pipe';
          \`\`\`

          ## Options
          | Option | Type | Default | Description |
          |--------|------|---------|-------------|
          | decimals | number | 2 | Number of decimal places |
          | locale | string | 'en-US' | Locale for formatting |
          | fallback | string | '-' | Fallback value for invalid inputs |
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<PercentageDemoComponent>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: `
          ## Basic Usage
          The default configuration displays percentages with 2 decimal places using the 'en-US' locale.

          \`\`\`typescript
          {{ 0.1234 | percentage }}
          // Output: 12.34%
          \`\`\`
        `,
      },
    },
  },
};

export const CustomDecimals: Story = {
  args: {},
  render: () => ({
    props: {},
    template: `
      <app-percentage-demo>
        <pre>{{ 0.1234 | percentage : { decimals: 3 } }}</pre>
      </app-percentage-demo>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
          ## Custom Decimal Places
          You can specify the number of decimal places using the 'decimals' option.

          \`\`\`typescript
          {{ 0.1234 | percentage : { decimals: 3 } }}
          // Output: 12.340%
          \`\`\`

          The decimals option accepts any non-negative integer. Setting it to 0 will round to the nearest whole number.
        `,
      },
    },
  },
};

export const DifferentLocales: Story = {
  args: {},
  render: () => ({
    props: {
      locales: [
        { value: 0.1234, locale: 'en-US' },
        { value: 0.1234, locale: 'fr-FR' },
        { value: 0.1234, locale: 'de-DE' },
      ],
    },
    template: `
      <app-percentage-demo>
        <div *ngFor="let item of locales">
          <strong>{{ item.locale }}:</strong>
          <pre>{{ item.value | percentage : { locale: item.locale } }}</pre>
        </div>
      </app-percentage-demo>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
          ## Internationalization
          The pipe supports different locales for formatting percentages according to regional standards.

          \`\`\`typescript
          // English (US)
          {{ 0.1234 | percentage : { locale: 'en-US' } }}
          // Output: 12.34%

          // French
          {{ 0.1234 | percentage : { locale: 'fr-FR' } }}
          // Output: 12,34 %

          // German
          {{ 0.1234 | percentage : { locale: 'de-DE' } }}
          // Output: 12,34 %
          \`\`\`

          The locale option accepts any valid locale identifier string.
        `,
      },
    },
  },
};

export const ErrorHandling: Story = {
  args: {},
  render: () => ({
    props: {
      invalidValues: [NaN, null, undefined, 'invalid'],
    },
    template: `
      <app-percentage-demo>
        <div *ngFor="let value of invalidValues">
          <strong>Value: {{ value }}</strong>
          <pre>{{ value | percentage : { fallback: 'Not Available' } }}</pre>
        </div>
      </app-percentage-demo>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
          ## Error Handling
          The pipe gracefully handles invalid inputs by displaying a fallback value.

          \`\`\`typescript
          // Handle invalid inputs with custom fallback
          {{ invalidValue | percentage : { fallback: 'Not Available' } }}
          // Output: Not Available

          // Handled cases include:
          // - NaN
          // - null
          // - undefined
          // - Non-numeric strings
          \`\`\`

          By default, the fallback value is '-' if not specified.
        `,
      },
    },
  },
};
