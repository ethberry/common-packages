import { string } from "yup";

import { symbolMinLength, symbolMaxLength } from "@ethberry/constants";

export const symbolValidationSchema = string()
  .required("form.validations.valueMissing")
  .min(symbolMinLength, "form.validations.tooShort")
  .max(symbolMaxLength, "form.validations.tooLong");
