import React, {FC, useContext} from "react";
import {useHistory, useParams} from "react-router";
import {Grid} from "@material-ui/core";
import {useSnackbar} from "notistack";
import {useIntl} from "react-intl";

import {PasswordInput} from "@trejgun/material-ui-inputs-core";
import {PageHeader} from "@trejgun/material-ui-page-header";
import {FormikForm} from "@trejgun/material-ui-form";
import {ApiContext, localizeErrors} from "@trejgun/provider-api";

import {validationSchema} from "./validation";
import useStyles from "./styles";

interface IRestorePasswordDto {
  password: string;
  confirm: string;
  token: string;
}

export const RestorePassword: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const {token} = useParams<{token: string}>();
  const {formatMessage} = useIntl();
  const {enqueueSnackbar} = useSnackbar();

  const api = useContext(ApiContext);

  const handleSubmit = (values: IRestorePasswordDto, formikBag: any): Promise<void> => {
    return api
      .fetchJson({
        url: "/auth/restore-password",
        method: "POST",
        data: values,
      })
      .then(() => {
        enqueueSnackbar(formatMessage({id: "snackbar.password-changed"}), {variant: "success"});
        history.push("/login");
      })
      .catch(e => {
        if (e.status === 400) {
          formikBag.setErrors(localizeErrors(e.message));
        } else if (e.status) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          enqueueSnackbar(formatMessage({id: `snackbar.${e.message}`}), {variant: "error"});
          history.push("/forgot-password");
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({id: "snackbar.error"}), {variant: "error"});
        }
      });
  };

  return (
    <Grid className={classes.section}>
      <PageHeader message="pages.guest.restorePassword" />
      <FormikForm
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={{
          password: "",
          confirm: "",
          token,
        }}
      >
        <PasswordInput name="password" autoComplete="new-password" />
        <PasswordInput name="confirm" autoComplete="new-password" />
      </FormikForm>
    </Grid>
  );
};
