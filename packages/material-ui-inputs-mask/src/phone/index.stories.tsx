import React, {ReactElement} from "react";
import {IntlProvider} from "react-intl";
import {Formik} from "formik";
import {Story} from "@storybook/react";

import {IPhoneInputProps, PhoneInput} from ".";

const i18n = {
  "form.labels.phoneMask": "Phone",
  "form.placeholders.phoneMask": "Enter phone number",
};

export default {
  title: "Example/Mask/Phone",
  component: PhoneInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Formik onSubmit={() => {}} initialValues={{phoneMask: ""}}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
};

const Template: Story<IPhoneInputProps> = args => <PhoneInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "phoneMask",
};
