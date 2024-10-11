import { globalPadding, globalSdkProvider, globalStrictMode } from '../src/decorators';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [globalStrictMode, globalPadding, globalSdkProvider]
};

export default preview;
