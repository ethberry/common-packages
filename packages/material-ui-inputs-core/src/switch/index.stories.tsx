import React, {ReactElement} from "react";
import {IntlProvider} from "react-intl";
import {Formik} from "formik";
import {Story} from "@storybook/react";

import {ISwitchInputProps, SwitchInput} from ".";

const i18n = {
  "form.labels.switch": "Switch",
};

export default {
  title: "Example/Input/Switch",
  component: SwitchInput,
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

const Template: Story<ISwitchInputProps> = args => <SwitchInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "switch",
};
