import { string } from "yup";

export const phoneNumberValidationSchema = string().required("form.validations.valueMissing");
