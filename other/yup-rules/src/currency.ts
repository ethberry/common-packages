import { number } from "yup";

export const currencyValidationSchema = number()
  .transform((value: string | number, originalValue: string | number) => {
    return originalValue === "" ? null : value;
  })
  .nullable()
  .typeError("form.validations.badInput")
  .required("form.validations.valueMissing")
  .integer("form.validations.badInput")
  .min(0, "form.validations.rangeUnderflow");
