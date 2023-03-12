import { string } from "yup";

import { emailMaxLength } from "@gemunion/constants";

export const emailValidationSchema = string()
  .max(emailMaxLength, "form.validations.tooLong")
  .required("form.validations.valueMissing")
  .email("form.validations.patternMismatch");
