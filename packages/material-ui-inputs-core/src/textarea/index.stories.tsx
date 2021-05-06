import React, {ReactElement} from "react";
import {IntlProvider} from "react-intl";
import {Formik} from "formik";
import {Story} from "@storybook/react";

import {ITextAreaProps, TextArea} from ".";

const i18n = {
  "form.labels.textarea": "Textarea",
  "form.placeholders.textarea": "Lorem ipsum...",
};

export default {
  title: "Example/Input/Textarea",
  component: TextArea,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Formik onSubmit={() => {}} initialValues={{textarea: "Lorem ipsum"}}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
};

const Template: Story<ITextAreaProps> = args => <TextArea {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "textarea",
};
