import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'react-native-sdk';

const meta = {
  title: 'Button',
  component: Button,
  args: {
    children: 'value',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
