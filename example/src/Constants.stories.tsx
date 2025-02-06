import type { Meta, StoryObj } from '@storybook/react';
import { ConstantsList } from './Constants';

const meta = {
  title: 'Constants',
  component: ConstantsList,
} satisfies Meta<typeof ConstantsList>;
type Story = StoryObj<typeof meta>;

export const AllConstants: Story = {};

export default meta;
