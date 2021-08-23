import React from "react";
import { Story } from "@storybook/react";

import { IMarkdownProps, Markdown } from ".";

import text from "./test.md";

export default {
  title: "Example/Markdown",
  component: Markdown,
};

const Template: Story<IMarkdownProps> = args => <Markdown {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  text,
};
