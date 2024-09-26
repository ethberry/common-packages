import { string } from "yup";

import { lastNameMinLength, lastNameMaxLength } from "@ethberry/constants";

export const lastNameValidationSchema = string()
  .min(lastNameMinLength, "form.validations.tooShort")
  .max(lastNameMaxLength, "form.validations.tooLong")
  .required("form.validations.valueMissing");
