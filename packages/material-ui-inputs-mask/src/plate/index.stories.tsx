import React, {ReactElement} from "react";
import {IntlProvider} from "react-intl";
import {Formik} from "formik";
import {Story} from "@storybook/react";

import {IPlateInputProps, PlateInput} from ".";

const i18n = {
  "form.labels.plateMask": "Plate",
  "form.placeholders.plateMask": "Enter plate number",
};

export default {
  title: "Example/Mask/Plate",
  component: PlateInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Formik onSubmit={() => {}} initialValues={{plateMask: ""}}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
};

const Template: Story<IPlateInputProps> = args => <PlateInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "plateMask",
};
