import React from "react";
import { MantineProvider } from "@mantine/core";
import { Preview } from "@storybook/react";
import "./globals.css";
import "split-pane-react/esm/themes/default.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
};

export default preview;
