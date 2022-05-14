import * as Yup from "yup";
import zxcvbn from "zxcvbn";

import { passwordMinLength, passwordScore } from "@gemunion/constants";

export const passwordValidationSchema = Yup.string()
  .required("form.validations.valueMissing")
  .min(passwordMinLength, "form.validations.tooShort")
  .test({
    message: "form.validations.weak",
    test: (password = "") => {
      if (password.length < passwordMinLength) {
        return false;
      }
      const { score } = zxcvbn(password);

      return score > passwordScore;
    },
  });
