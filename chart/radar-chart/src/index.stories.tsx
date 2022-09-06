import { Story } from "@storybook/react";

import { RadarChart } from ".";
import { IRadarChart } from "./interface";

export default {
  title: "Example/RadarChart",
  component: RadarChart,
};

const Template: Story<IRadarChart> = args => <RadarChart {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  data: [
    [
      // Grecia
      { axis: "AD", value: 0.2 },
      { axis: "HP", value: 0.7 },
      { axis: "ASP", value: 0.2 },
      { axis: "MNR", value: 0.2 },
      { axis: "SP", value: 0.9 },
      { axis: "DMG", value: 0.4 },
      { axis: "ARM", value: 0.5 },
      { axis: "SP2", value: 0.9 },
      { axis: "DMG2", value: 0.4 },
      { axis: "ARM2", value: 0.5 },
    ],
    [
      // Australia
      { axis: "AD", value: 0.3 },
      { axis: "HP", value: 0.2 },
      { axis: "ASP", value: 0.7 },
      { axis: "MNR", value: 0.6 },
      { axis: "SP", value: 0.3 },
      { axis: "DMG", value: 0.2 },
      { axis: "ARM", value: 0.1 },
      { axis: "SP2", value: 0.3 },
      { axis: "DMG2", value: 0.2 },
      { axis: "ARM2", value: 0.1 },
    ],
    [
      // Amsterdam
      { axis: "AD", value: 0.1 },
      { axis: "HP", value: 0.1 },
      { axis: "ASP", value: 0.3 },
      { axis: "MNR", value: 0.6 },
      { axis: "SP", value: 0.6 },
      { axis: "DMG", value: 0.8 },
      { axis: "ARM", value: 0.3 },
      { axis: "SP2", value: 0.3 },
      { axis: "DMG2", value: 0.5 },
      { axis: "ARM2", value: 0.9 },
    ],
  ],
};
