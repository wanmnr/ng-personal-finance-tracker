// footer.component.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { FooterComponent } from './footer.component';

const meta: Meta<FooterComponent> = {
  title: 'Layout/Footer',
  component: FooterComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f3f4f6' },
        { name: 'dark', value: '#1f2937' }
      ]
    }
  }
};

export default meta;
type Story = StoryObj<FooterComponent>;

export const Default: Story = {
  args: {
    companyName: 'Demo Company',
    socialLinks: [
      { icon: 'facebook', url: '#', label: 'Visit us on Facebook' },
      { icon: 'twitter', url: '#', label: 'Follow us on Twitter' },
      { icon: 'linkedin', url: '#', label: 'Connect with us on LinkedIn' }
    ]
  }
};

export const WithCustomSections: Story = {
  args: {
    companyName: 'Demo Company',
    footerSections: [
      {
        title: 'Products',
        links: [
          { label: 'Feature 1', url: '/feature-1' },
          { label: 'Feature 2', url: '/feature-2' }
        ]
      },
      {
        title: 'Resources',
        links: [
          { label: 'Blog', url: '/blog' },
          { label: 'Documentation', url: '/docs' }
        ]
      }
    ]
  }
}