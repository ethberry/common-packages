import { ReactElement } from "react";
import { Formik } from "formik";

import { Story } from "@storybook/react";

import { ApiProvider } from "@gemunion/provider-api";
import { getFirebaseAuthStrategy } from "@gemunion/auth-strategy-firebase";

import { IGeeTestCaptchaProps, GeeTestCaptcha } from ".";

export default {
  title: "Example/GeeTestCaptcha",
  component: GeeTestCaptcha,
  decorators: [
    (Story: Story): ReactElement => (
      <ApiProvider baseUrl={"http://localhost/"} getAuthStrategy={getFirebaseAuthStrategy}>
        <Formik onSubmit={() => {}} initialValues={{ photo: [] }}>
          <Story />
        </Formik>
      </ApiProvider>
    ),
  ],
};

const Template: Story<IGeeTestCaptchaProps> = args => <GeeTestCaptcha {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "captcha",
};
