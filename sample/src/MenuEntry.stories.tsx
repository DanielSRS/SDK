import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from '@danielsrs/react-native-sdk';

const meta = {
  title: 'MenuEntry',
  component: Menu.MenuEntry,
  args: {
    children: 'Option',
  },
} satisfies Meta<typeof Menu.MenuEntry>;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export default meta;
