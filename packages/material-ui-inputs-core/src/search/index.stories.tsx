import React, {ReactElement} from "react";
import {IntlProvider} from "react-intl";
import {Formik} from "formik";
import {Story} from "@storybook/react";

import {ISearchInputProps, SearchInput} from ".";

const i18n = {
  "form.labels.search": "Search",
  "form.placeholders.search": "Search...",
};

export default {
  title: "Example/Input/Search",
  component: SearchInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Formik onSubmit={() => {}} initialValues={{search: ""}}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
};

const Template: Story<ISearchInputProps> = args => <SearchInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "search",
};
