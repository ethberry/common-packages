import React, {ReactElement} from "react";
import {IntlProvider} from "react-intl";
import {Formik} from "formik";
import {Story} from "@storybook/react";

import {ITextInputProps, TextInput} from ".";

const i18n = {
  "form.labels.text": "Text",
  "form.placeholders.text": "Lorem ipsum...",
};

export default {
  title: "Example/Input/Text",
  component: TextInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Formik onSubmit={() => {}} initialValues={{text: ""}}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
};

const Template: Story<ITextInputProps> = args => <TextInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "text",
};
