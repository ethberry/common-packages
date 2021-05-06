import React, {ReactElement} from "react";
import {IntlProvider} from "react-intl";
import {Formik} from "formik";
import {Story} from "@storybook/react";

import {ISliderInputProps, SliderInput} from ".";

const i18n = {
  "form.labels.slider": "Slider",
};

export default {
  title: "Example/Input/Slider",
  component: SliderInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Formik onSubmit={() => {}} initialValues={{slider: 250}}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
};

const Template: Story<ISliderInputProps> = args => <SliderInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "slider",
  min: 100,
  max: 1000,
};
