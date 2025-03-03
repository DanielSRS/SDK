import type { Meta } from '@storybook/react';
import { ResizableView, Colors$ } from 'react-native-sdk';

export default {
  title: 'Components/ResizableView',
  component: ResizableView,
  args: {
    style: {
      minHeight: 100,
      minWidth: 100,
      flex: 1,
      borderWidth: 1,
      borderColor: Colors$.strokeColorControlStrongStrokeDefault
        .peek()
        .toString(),
    },
    maxWidthToResize: 400,
    fromRight: true,
  },
} satisfies Meta<typeof ResizableView>;

export const Default: Meta<typeof ResizableView> = {};
