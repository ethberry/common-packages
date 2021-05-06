import React, {ReactElement} from "react";
import {IntlProvider, FormattedMessage} from "react-intl";
import {Button} from "@material-ui/core";
import {Story} from "@storybook/react";

import {PageHeader, IPageHeader} from ".";

const i18n = {
  "pages.test.title": "Page header",
  "pages.test.title-with-var": "Page header with variable: {var}",
  "pages.test.button": "Click me!",
};

export default {
  title: "Example/PageHeader",
  component: PageHeader,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Story />
      </IntlProvider>
    ),
  ],
};

const Template: Story<IPageHeader> = args => <PageHeader {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  message: "pages.test.title",
};

export const WithVariable = Template.bind({});
WithVariable.args = {
  message: "pages.test.title-with-var",
  data: {var: "VAR"},
};

const Template2: Story<IPageHeader> = args => (
  <PageHeader {...args}>
    <Button color="primary" variant="contained">
      <FormattedMessage id="pages.test.button" />
    </Button>
  </PageHeader>
);

export const WithButton = Template2.bind({});
WithButton.args = {
  message: "pages.test.title",
};
