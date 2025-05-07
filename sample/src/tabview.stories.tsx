import type { Meta, StoryObj } from '@storybook/react';
import { TabViewStory } from './tabview';

const meta = {
  title: 'TabView',
  component: TabViewStory,
} satisfies Meta<typeof TabViewStory>;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export default meta;
