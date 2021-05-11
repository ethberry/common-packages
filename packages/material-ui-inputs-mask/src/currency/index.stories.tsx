import React, {ReactElement} from "react";
import {IntlProvider} from "react-intl";
import {Formik} from "formik";
import {Story} from "@storybook/react";

import {CurrencyInput, ICurrencyInputProps} from ".";

const i18n = {
  "form.labels.currencyMask": "Currency",
  "form.placeholders.currencyMask": "Enter amount",
};

export default {
  title: "Example/Mask/Currency",
  component: CurrencyInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Formik onSubmit={() => {}} initialValues={{currencyMask: 100}}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
};

const Template: Story<ICurrencyInputProps> = args => <CurrencyInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "currencyMask",
};
