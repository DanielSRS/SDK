import type { Meta, StoryObj } from '@storybook/react';
import { ZStackS } from './ZStack';

const meta = {
  title: 'ZStack',
  component: ZStackS,
} satisfies Meta<typeof ZStackS>;
type Story = StoryObj<typeof meta>;

export const Grouped: Story = {};

export default meta;
