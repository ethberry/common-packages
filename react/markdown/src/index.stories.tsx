import { Meta, StoryObj } from "@storybook/react";

import { markdownString } from "@gemunion/draft-js-utils";

import { Markdown } from ".";

export default {
  title: "Example/Markdown",
  component: Markdown,
} as Meta<typeof Markdown>;

type Story = StoryObj<typeof Markdown>;

const Template: Story = {
  render: args => <Markdown {...args} />,
};

export const Simple = {
  ...Template,
  args: {
    text: markdownString,
  },
};
