import type { Meta, StoryObj } from '@storybook/react';
import { Observables } from './Observables';

const meta = {
  title: 'Observables',
  component: Observables,
} satisfies Meta<typeof Observables>;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export default meta;
