import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  framework: "@storybook/react-webpack5",
  stories: ["../chart/*/src/**/*.stories.@(ts|tsx)", "../react/*/src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/preset-create-react-app",
      options: {
        craOverrides: {
          fileLoaderExcludes: ["less"],
        },
      },
    },
  ],
  docs: {
    autodocs: true,
  },
  webpackFinal: config => {
    const { oneOf } = config.module.rules[4];
    const babelLoader = oneOf.find(({ test }) => new RegExp(test).test(".ts"));
    babelLoader.include = [/react\/(.*)\/src/, /chart\/(.*)\/src/, /.storybook/];
    babelLoader.options.sourceType = "unambiguous";
    return config;
  },
};

export default config;
