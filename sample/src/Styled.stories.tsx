import type { Meta, StoryObj } from '@storybook/react';
import { StyledExample } from './Styled';

const meta = {
  title: 'Styled',
  component: StyledExample,
} satisfies Meta<typeof StyledExample>;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export default meta;
