import React, {ReactElement} from "react";
import {IntlProvider} from "react-intl";
import {Formik} from "formik";
import {Story} from "@storybook/react";

import {INumberInputProps, NumberInput} from ".";

const i18n = {
  "form.labels.number": "Number",
  "form.placeholders.number": "100",
};

export default {
  title: "Example/Input/Number",
  component: NumberInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Formik onSubmit={() => {}} initialValues={{number: 50}}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
};

const Template: Story<INumberInputProps> = args => <NumberInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "number",
};

export const Negative = Template.bind({});
Negative.args = {
  allowNegative: true,
  name: "number",
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  readOnly: true,
  name: "number",
};
