import { Meta, StoryObj } from "@storybook/react";

import { RadarChart } from ".";

export default {
  title: "Example/RadarChart",
  component: RadarChart,
} as Meta<typeof RadarChart>;

type Story = StoryObj<typeof RadarChart>;

const Template: Story = {
  render: args => <RadarChart {...args} />,
};

export const Simple = {
  ...Template,
  args: {
    data: [
      [
        // Old
        { axis: "strength", value: 8 },
        { axis: "dexterity", value: 10 },
        { axis: "constitution", value: 9 },
        { axis: "intelligence", value: 9 },
        { axis: "wisdom", value: 7 },
        { axis: "charisma", value: 8 },
      ],
      [
        // New
        { axis: "strength", value: 8 },
        { axis: "dexterity", value: 8 },
        { axis: "constitution", value: 9 },
        { axis: "intelligence", value: 8 },
        { axis: "wisdom", value: 8 },
        { axis: "charisma", value: 9 },
      ],
    ],
  },
};
