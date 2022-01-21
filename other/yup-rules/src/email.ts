import * as Yup from "yup";

import { emailMaxLength } from "@gemunion/constants";

export const emailValidationSchema = Yup.string()
  .max(emailMaxLength, "form.validations.tooLong")
  .required("form.validations.valueMissing")
  .email("form.validations.patternMismatch");
