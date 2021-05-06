import React, {ReactElement} from "react";
import {IntlProvider} from "react-intl";
import {Formik} from "formik";
import {Story} from "@storybook/react";

import {ISelectInputProps, SelectInput} from ".";

const i18n = {
  "enums.select.ONE": "ONE",
  "enums.select.TWO": "TWO",
  "form.labels.select": "Select",
};

enum SelectOptions {
  ONE = "ONE",
  TWO = "TWO",
}

export default {
  title: "Example/Input/Select",
  component: SelectInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Formik onSubmit={() => {}} initialValues={{select: SelectOptions.ONE}}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
};

const Template: Story<ISelectInputProps> = args => <SelectInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "select",
  options: SelectOptions,
};
