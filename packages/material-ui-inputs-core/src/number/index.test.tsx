import React from "react";
import {IntlProvider} from "react-intl";
import {render, cleanup} from "@testing-library/react";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import {Formik} from "formik";

import {NumberInput} from "./";

afterEach(cleanup);

const i18n = {
  "form.labels.number": "Number",
  "form.placeholders.number": "50",
};

describe("<NumberInput />", () => {
  it("renders positive value", () => {
    const props = {
      name: "number",
      value: 50,
    };

    const formikProps = {
      onSubmit: jest.fn(),
      initialValues: {
        number: 50,
      },
    };

    const {asFragment} = render(
      <MuiThemeProvider theme={createMuiTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <Formik {...formikProps}>
            <NumberInput {...props} />
          </Formik>
        </IntlProvider>
      </MuiThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders negative value", () => {
    const props = {
      name: "number",
      value: -50,
    };

    const formikProps = {
      onSubmit: jest.fn(),
      initialValues: {
        number: -50,
      },
    };

    const {asFragment} = render(
      <MuiThemeProvider theme={createMuiTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <Formik {...formikProps}>
            <NumberInput {...props} />
          </Formik>
        </IntlProvider>
      </MuiThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders decimal value", () => {
    const props = {
      name: "number",
      value: 9.99,
    };

    const formikProps = {
      onSubmit: jest.fn(),
      initialValues: {
        number: 9.99,
      },
    };

    const {asFragment} = render(
      <MuiThemeProvider theme={createMuiTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <Formik {...formikProps}>
            <NumberInput {...props} />
          </Formik>
        </IntlProvider>
      </MuiThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
