import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker } from '@danielsrs/react-native-sdk';

const meta = {
  title: 'ColorPicker',
  component: ColorPicker,
} satisfies Meta<typeof ColorPicker>;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export default meta;
