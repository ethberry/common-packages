import * as Yup from "yup";

import { fetchJson } from "@gemunion/provider-api";
import { passwordMinLength, passwordScore } from "@gemunion/constants";

export const passwordValidationSchema = Yup.string()
  .min(passwordMinLength, "form.validations.tooShort")
  .required("form.validations.valueMissing")
  .test({
    message: "form.validations.weak",
    test: (password = "") => {
      // https://github.com/jquense/yup/issues/851
      if (password.length < passwordMinLength) {
        return false;
      }
      return fetchJson(`${process.env.BE_URL}/auth/get-password-score`, {
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
        }),
        credentials: "include",
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          password,
        }),
      }).then(({ score }: { score: number }): boolean => score > passwordScore);
    },
  });
