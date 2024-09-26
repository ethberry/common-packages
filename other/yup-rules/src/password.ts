import { string } from "yup";

import { fetchJson } from "@ethberry/provider-api";
import { passwordMinLength, passwordScore } from "@ethberry/constants";

export const passwordValidationSchema = string()
  .min(passwordMinLength, "form.validations.tooShort")
  .required("form.validations.valueMissing")
  .test({
    message: "form.validations.tooWeak",
    test: (password = "") => {
      // https://github.com/jquense/yup/issues/851
      if (password.length < passwordMinLength) {
        return false;
      }
      /* javascript-obfuscator:disable */
      const baseUrl = process.env.BE_URL;
      /* javascript-obfuscator:enable */
      return fetchJson(`${baseUrl}/auth/get-password-score`, {
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
