import React from "react";
import {IntlProvider} from "react-intl";
import {cleanup, render} from "@testing-library/react";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {Formik} from "formik";
import {SnackbarProvider} from "notistack";

import {AvatarInput} from "./";

afterEach(cleanup);

const i18n = {
  "form.labels.avatar": "Avatar",
  "form.tips.delete": "Delete",
  "form.validations.valueMissing": "Avatar is required",
  "form.validations.whitelistValidation": "Property Avatar is not recognized",
};

describe("<AvatarInput />", () => {
  it("renders the empty field", () => {
    const props = {
      name: "avatar",
    };

    const formikProps = {
      onSubmit: jest.fn(),
      onChange: jest.fn(),
      initialValues: {
        avatar: "",
      },
    };

    const {asFragment} = render(
      <MuiThemeProvider theme={createMuiTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <SnackbarProvider maxSnack={3}>
            <Formik {...formikProps}>
              <AvatarInput {...props} />
            </Formik>
          </SnackbarProvider>
        </IntlProvider>
      </MuiThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the field with image", () => {
    const props = {
      name: "avatar",
    };

    const formikProps = {
      onSubmit: jest.fn(),
      onChange: jest.fn(),
      initialValues: {
        avatar: "https://lms2-dev.s3-us-west-2.amazonaws.com/7f0f427f-eeba-4ffb-a1c8-f730721bfd46.jpeg",
      },
    };

    const {asFragment} = render(
      <MuiThemeProvider theme={createMuiTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <SnackbarProvider maxSnack={3}>
            <Formik {...formikProps}>
              <AvatarInput {...props} />
            </Formik>
          </SnackbarProvider>
        </IntlProvider>
      </MuiThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders image with error from server", () => {
    const props = {
      name: "avatar",
    };

    const formikProps = {
      onSubmit: jest.fn(),
      onChange: jest.fn(),
      initialValues: {
        avatar: "https://lms2-dev.s3-us-west-2.amazonaws.com/7f0f427f-eeba-4ffb-a1c8-f730721bfd46.jpeg",
      },
      initialErrors: {
        avatar: "form.validations.whitelistValidation",
      },
    };

    const {asFragment} = render(
      <MuiThemeProvider theme={createMuiTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <SnackbarProvider maxSnack={3}>
            <Formik {...formikProps}>
              <AvatarInput {...props} />
            </Formik>
          </SnackbarProvider>
        </IntlProvider>
      </MuiThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders empty field with error: image is required", () => {
    const props = {
      name: "avatar",
    };

    const formikProps = {
      onSubmit: jest.fn(),
      onChange: jest.fn(),
      initialValues: {},
      initialErrors: {
        avatar: "form.validations.valueMissing",
      },
    };

    const {asFragment} = render(
      <MuiThemeProvider theme={createMuiTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <SnackbarProvider maxSnack={3}>
            <Formik {...formikProps}>
              <AvatarInput {...props} />
            </Formik>
          </SnackbarProvider>
        </IntlProvider>
      </MuiThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
