// button.component.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { userEvent, within } from '@storybook/test';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Default Button',
    primary: false,
  },
  argTypes: {
    backgroundColor: {
      control: 'color',
      description: 'Background color of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
    },
    onClick: {
      action: 'clicked',
      description: 'Button click event',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: 'Secondary Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Large Button',
  },
};

// Story with play function for testing
export const ClickTest: Story = {
  args: {
    label: 'Click Test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
  },
};
