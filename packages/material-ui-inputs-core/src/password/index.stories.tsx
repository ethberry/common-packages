import React, {ReactElement} from "react";
import {IntlProvider} from "react-intl";
import {Formik} from "formik";
import {Story} from "@storybook/react";

import {IPasswordInputProps, PasswordInput} from ".";

const i18n = {
  "form.labels.password": "Password",
  "form.placeholders.password": "******",
};

export default {
  title: "Example/Input/Password",
  component: PasswordInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Formik onSubmit={() => {}} initialValues={{password: ""}}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
};

const Template: Story<IPasswordInputProps> = args => <PasswordInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "password",
};
