import { string } from "yup";

import { lastNameMinLength, lastNameMaxLength } from "@gemunion/constants";

export const lastNameValidationSchema = string()
  .min(lastNameMinLength, "form.validations.tooShort")
  .max(lastNameMaxLength, "form.validations.tooLong")
  .required("form.validations.valueMissing");
