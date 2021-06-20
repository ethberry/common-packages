import React, {FC, useContext, useEffect} from "react";
import {Grid} from "@material-ui/core";
import {useHistory} from "react-router";
import {useSnackbar} from "notistack";
import {useIntl} from "react-intl";

import {Captcha} from "@trejgun/material-ui-inputs-captcha";
import {PageHeader} from "@trejgun/material-ui-page-header";
import {FormikForm} from "@trejgun/material-ui-form";
import {TextInput} from "@trejgun/material-ui-inputs-core";
import {UserContext} from "@trejgun/provider-user";
import {ApiContext, localizeErrors} from "@trejgun/provider-api";

import {validationSchema} from "./validation";
import useStyles from "./styles";

interface IForgotPasswordDto {
  email: string;
  captcha: string;
}

export const ForgotPassword: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const {enqueueSnackbar} = useSnackbar();
  const {formatMessage} = useIntl();

  const user = useContext(UserContext);
  const api = useContext(ApiContext);

  const handleSubmit = (values: IForgotPasswordDto, formikBag: any): Promise<void> => {
    return api
      .fetchJson({
        url: "/auth/forgot-password",
        method: "POST",
        data: values,
      })
      .then(() => {
        history.push("/message/forgot-successful");
      })
      .catch(e => {
        if (e.status === 400) {
          formikBag.setErrors(localizeErrors(e.message));
        } else if (e.status) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          enqueueSnackbar(formatMessage({id: `snackbar.${e.message}`}), {variant: "error"});
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({id: "snackbar.error"}), {variant: "error"});
        }
      });
  };

  useEffect(() => {
    if (user.isAuthenticated()) {
      void user.sync("/profile");
    }
  }, [user.isAuthenticated()]);

  return (
    <Grid container className={classes.section}>
      <Grid item sm={10}>
        <PageHeader message="pages.guest.forgotPassword" />
        <FormikForm
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          initialValues={{
            email: "",
            captcha: "",
          }}
        >
          <TextInput name="email" autoComplete="username" />
          <Captcha />
        </FormikForm>
      </Grid>
    </Grid>
  );
};
