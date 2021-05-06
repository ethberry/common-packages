import React, {ReactElement} from "react";
import {IntlProvider} from "react-intl";
import {Formik} from "formik";
import {Story} from "@storybook/react";

import {ICheckboxInputProps, CheckboxInput} from ".";

const i18n = {
  "form.labels.checkbox": "Checkbox",
};

export default {
  title: "Example/Input/Checkbox",
  component: CheckboxInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Formik onSubmit={() => {}} initialValues={{checkbox: false}}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
};

const Template: Story<ICheckboxInputProps> = args => <CheckboxInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "checkbox",
};
