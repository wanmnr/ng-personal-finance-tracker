// sidebar.component.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { SidebarComponent } from './sidebar.component';

const meta: Meta<SidebarComponent> = {
  title: 'Layout/Sidebar',
  component: SidebarComponent,
  tags: ['autodocs'],
  decorators: [
    // Add any necessary decorators
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<SidebarComponent>;

export const Expanded: Story = {
  args: {
    isExpanded: true,
    menuItems: [
      { icon: 'home', label: 'Home', route: '/home' },
      { icon: 'person', label: 'Profile', route: '/profile' },
      { icon: 'settings', label: 'Settings', route: '/settings' },
      { icon: 'help', label: 'Help', route: '/help' }
    ]
  },
};

export const Collapsed: Story = {
  args: {
    isExpanded: false,
    menuItems: [
      { icon: 'home', label: 'Home', route: '/home' },
      { icon: 'person', label: 'Profile', route: '/profile' },
      { icon: 'settings', label: 'Settings', route: '/settings' },
      { icon: 'help', label: 'Help', route: '/help' }
    ]
  },
}