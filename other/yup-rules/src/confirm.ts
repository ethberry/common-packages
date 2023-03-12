import { ref, string } from "yup";

export const confirmValidationSchema = string()
  .equals([ref("password")], "form.validations.patternMismatch")
  .required("form.validations.valueMissing");
