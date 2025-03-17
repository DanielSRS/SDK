import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@danielsrs/react-native-sdk';

const meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    disabled: { type: 'boolean' },
    accent: { type: 'boolean' },
    onPress: { action: 'onPress' },
  },
  args: {
    children: 'value',
    disabled: false,
  },
} satisfies Meta<typeof Button>;
type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {};

export const TextOnlyNoAccent: Story = {
  args: { accent: false },
};

export const TextOnlyDisabled: Story = {
  args: { disabled: true },
};

export const TextOnlyNoAccentDisabled: Story = {
  args: { disabled: true, accent: false },
};

export default meta;
