import { string } from "yup";

import { titleMinLength, titleMaxLength } from "@gemunion/constants";

export const titleValidationSchema = string()
  .required("form.validations.valueMissing")
  .min(titleMinLength, "form.validations.rangeUnderflow")
  .max(titleMaxLength, "form.validations.rangeUnderflow");
