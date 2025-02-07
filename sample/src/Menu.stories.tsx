import type { Meta, StoryObj } from '@storybook/react';
import { MenuExample } from './Menu';

const meta = {
  title: 'MenuExample',
  component: MenuExample,
} satisfies Meta<typeof MenuExample>;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export default meta;
