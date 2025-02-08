import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton } from 'react-native-sdk';

const meta = {
  title: 'RadioButton',
  component: RadioButton,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    selected: false,
  },
} satisfies Meta<typeof RadioButton>;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {};
export const Selected: Story = {
  args: {
    selected: true,
  },
};
export const WithLabel: Story = {
  args: {
    selected: true,
    label: 'Label text',
  },
};

export default meta;
