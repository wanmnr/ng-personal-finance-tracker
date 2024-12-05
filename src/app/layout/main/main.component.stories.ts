// main.component.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { MainComponent } from './main.component';
import { moduleMetadata } from '@storybook/angular';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<MainComponent> = {
  title: 'Layout/Main',
  component: MainComponent,
  decorators: [
    moduleMetadata({
      imports: [
        RouterModule.forRoot([], { useHash: true }),
        BrowserAnimationsModule
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<MainComponent>;

export const Desktop: Story = {
  args: {
    isSidenavExpanded: true,
    isMobile: false,
  },
};

export const Mobile: Story = {
  args: {
    isSidenavExpanded: false,
    isMobile: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};