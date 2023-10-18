import path from "path";
import { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    if (config.resolve?.alias) {
      config.resolve.alias["@"] = path.resolve(__dirname, "../src");
    }
    return config;
  },
  //   staticDirs: [path.join(__dirname, "../../../../assets")],
};
export default config;
