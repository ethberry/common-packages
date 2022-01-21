import * as Yup from "yup";

import { displayNameMinLength, displayNameMaxLength } from "@gemunion/constants";

export const displayNameValidationSchema = Yup.string()
  .min(displayNameMinLength, "form.validations.tooShort")
  .max(displayNameMaxLength, "form.validations.tooLong")
  .required("form.validations.valueMissing");
