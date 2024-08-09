import { string } from "yup";

import { reUrl } from "@gemunion/constants";

export const urlValidationSchema = string()
  .required("form.validations.valueMissing")
  .matches(reUrl, "form.validations.patternMismatch");
