import { Story } from "@storybook/react";

import { IMarkdownProps, Markdown } from ".";

import { markdownString } from "@gemunion/draft-js-utils";

export default {
  title: "Example/Markdown",
  component: Markdown,
};

const Template: Story<IMarkdownProps> = args => <Markdown {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  text: markdownString,
};
