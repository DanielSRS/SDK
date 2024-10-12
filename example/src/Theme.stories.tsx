import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from './ThemeControl';

const meta = {
  title: 'Theme',
  component: Theme,
} satisfies Meta<typeof Theme>;
type Story = StoryObj<typeof meta>;

export const Grouped: Story = {};

export default meta;
