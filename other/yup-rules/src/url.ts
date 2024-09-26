import { string } from "yup";

import { reUrl } from "@ethberry/constants";

export const urlValidationSchema = string()
  .required("form.validations.valueMissing")
  .matches(reUrl, "form.validations.patternMismatch");
