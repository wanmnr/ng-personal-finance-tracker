// header.component.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { HeaderComponent } from './header.component';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

const meta: Meta<HeaderComponent> = {
  title: 'Layout/Header',
  component: HeaderComponent,
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
  },
  argTypes: {
    menuClick: { action: 'menuClicked' },
    themeToggle: { action: 'themeToggled' }
  }
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Default: Story = {
  args: {
    appName: 'My Application',
    notificationCount: 3,
    userName: 'John Doe',
  }
};

export const WithoutNotifications: Story = {
  args: {
    appName: 'My Application',
    notificationCount: 0,
    userName: 'John Doe',
  }
};

export const MobileView: Story = {
  args: {
    appName: 'My Application',
    notificationCount: 3,
    userName: 'John Doe',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};