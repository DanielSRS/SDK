import type { Meta, StoryObj } from '@storybook/react';
import { ColorsTokens } from './ColorsTokens';

const meta = {
  title: 'ColorsTokens',
  component: ColorsTokens,
} satisfies Meta<typeof ColorsTokens>;
type Story = StoryObj<typeof meta>;

export const List: Story = {};

export default meta;
