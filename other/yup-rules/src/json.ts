import { string } from "yup";

const isValidJSON = (value?: string): any => {
  try {
    JSON.parse(value!);
    return true;
  } catch (e) {
    void e;
    return false;
  }
};

export const jsonValidationSchema = string()
  .required("form.validations.valueMissing")
  .test("is-json", "form.validations.invalidJSON", isValidJSON);
