import { globalPadding, globalSdkProvider, globalStrictMode } from "../src/decorators";
import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  decorators: [globalStrictMode, globalPadding, withBackgrounds, globalSdkProvider],

  parameters: {
    backgrounds: {
      default: "plain",
      values: [
        { name: "plain", value: "transparent" },
        { name: "warm", value: "hotpink" },
        { name: "cool", value: "deepskyblue" },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
