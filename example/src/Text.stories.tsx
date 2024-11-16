import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'Texts',
  component: Text,
} satisfies Meta<typeof Text>;
type Story = StoryObj<typeof meta>;

export const AllTexts: Story = {};

export default meta;
