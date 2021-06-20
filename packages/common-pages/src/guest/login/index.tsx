import React, {FC, useContext, useEffect} from "react";
import {useSnackbar} from "notistack";
import {useIntl} from "react-intl";
import {Grid} from "@material-ui/core";

import {PasswordInput, TextInput} from "@trejgun/material-ui-inputs-core";
import {PageHeader} from "@trejgun/material-ui-page-header";
import {FormikForm} from "@trejgun/material-ui-form";
import {ApiContext, IAuth} from "@trejgun/provider-api";
import {UserContext} from "@trejgun/provider-user";

import {validationSchema} from "./validation";
import useStyles from "./styles";
import {LoginButtons} from "./buttons";

interface ILoginDto {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const classes = useStyles();
  const {enqueueSnackbar} = useSnackbar();
  const {formatMessage} = useIntl();

  const user = useContext(UserContext);
  const api = useContext(ApiContext);

  const handleSubmit = (values: ILoginDto): Promise<void> => {
    return api
      .fetchJson({
        url: "/auth/login",
        method: "POST",
        data: values,
      })
      .then((json: IAuth) => {
        api.setToken(json);
        return user.sync("/dashboard");
      })
      .catch(e => {
        if (e.status) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          enqueueSnackbar(formatMessage({id: `snackbar.${e.message}`}), {variant: "error"});
        } else {
          console.error(e);
          enqueueSnackbar(formatMessage({id: "snackbar.error"}), {variant: "error"});
        }
      });
  };

  const onMessage = (event: MessageEvent): void => {
    if (event.origin === process.env.BE_URL) {
      api.setToken(event.data);
      void user.sync("/dashboard");
    }
  };

  useEffect(() => {
    void user.sync("/dashboard");
  }, [user.isAuthenticated()]);

  useEffect(() => {
    window.addEventListener("message", onMessage, false);

    return (): void => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <Grid container className={classes.section}>
      <Grid item sm={12}>
        <PageHeader message="pages.guest.login" />

        <FormikForm
          showButtons={false}
          showPrompt={false}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={{
            password: "",
            email: "",
          }}
        >
          <TextInput name="email" autoComplete="username" />
          <PasswordInput name="password" autoComplete="current-password" />
          <LoginButtons />
        </FormikForm>
      </Grid>
    </Grid>
  );
};
