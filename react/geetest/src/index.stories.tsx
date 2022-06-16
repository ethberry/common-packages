import { ReactElement } from "react";

import { Story } from "@storybook/react";

import { FormWrapper } from "@gemunion/mui-form";
import { FirebaseApiProvider } from "@gemunion/provider-api-firebase";

import { IGeeTestCaptchaProps, GeeTestCaptcha } from ".";

export default {
  title: "Example/GeeTestCaptcha",
  component: GeeTestCaptcha,
  decorators: [
    (Story: Story): ReactElement => (
      <FirebaseApiProvider baseUrl={"http://localhost/"}>
        <FormWrapper onSubmit={Promise.resolve} initialValues={{ photo: [] }}>
          <Story />
        </FormWrapper>
      </FirebaseApiProvider>
    ),
  ],
};

const Template: Story<IGeeTestCaptchaProps> = args => <GeeTestCaptcha {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "captcha",
};
