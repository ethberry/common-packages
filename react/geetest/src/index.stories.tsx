import { ReactElement } from "react";
import { FormWrapper } from "@gemunion/mui-form";

import { Story } from "@storybook/react";

import { ApiProvider } from "@gemunion/provider-api";

import { IGeeTestCaptchaProps, GeeTestCaptcha } from ".";

export default {
  title: "Example/GeeTestCaptcha",
  component: GeeTestCaptcha,
  decorators: [
    (Story: Story): ReactElement => (
      <ApiProvider baseUrl={"http://localhost/"}>
        <FormWrapper onSubmit={Promise.resolve} initialValues={{ photo: [] }}>
          <Story />
        </FormWrapper>
      </ApiProvider>
    ),
  ],
};

const Template: Story<IGeeTestCaptchaProps> = args => <GeeTestCaptcha {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "captcha",
};
