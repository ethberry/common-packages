import React, {ReactElement} from "react";
import {IntlProvider} from "react-intl";
import {Formik} from "formik";
import {Story} from "@storybook/react";

import {StaticInput, IStaticInputProps} from ".";

const i18n = {
  "form.labels.static": "Static",
};

export default {
  title: "Example/Input/Static",
  component: StaticInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Formik onSubmit={() => {}} initialValues={{static: "static"}}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
};

const Template: Story<IStaticInputProps> = args => <StaticInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "static",
};
