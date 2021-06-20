import React, {FC, useContext} from "react";
import {useHistory} from "react-router";
import {useSnackbar} from "notistack";
import {Grid} from "@material-ui/core";
import {useIntl} from "react-intl";

import {Captcha} from "@trejgun/material-ui-inputs-captcha";
import {PageHeader} from "@trejgun/material-ui-page-header";
import {TextInput} from "@trejgun/material-ui-inputs-core";
import {FormikForm} from "@trejgun/material-ui-form";
import {ApiContext, localizeErrors} from "@trejgun/provider-api";

import useStyles from "./styles";
import {validationSchema} from "./validation";

interface IResendVerificationEmailDto {
  email: string;
  captcha: string;
}

export const ResendVerificationEmail: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const {enqueueSnackbar} = useSnackbar();
  const {formatMessage} = useIntl();

  const api = useContext(ApiContext);

  const handleSubmit = (values: IResendVerificationEmailDto, formikBag: any): Promise<void> => {
    return api
      .fetchJson({
        url: "/auth/resend-email-verification",
        method: "POST",
        data: values,
      })
      .then(() => {
        history.push("/message/resend-successful");
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

  return (
    <Grid container className={classes.section}>
      <Grid item sm={10}>
        <PageHeader message="pages.guest.resendVerificationEmail" />

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
