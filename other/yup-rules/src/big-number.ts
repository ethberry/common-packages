import * as Yup from "yup";
import { BigNumber } from "ethers";

Yup.addMethod(Yup.mixed, "isBigNumber", function (errorMessage) {
  return this.test(`dis-big-number`, errorMessage, function (value) {
    const { path, createError } = this;
    try {
      BigNumber.from(value);
      return true;
    } catch (_e) {
      return createError({ path, message: errorMessage });
    }
  });
});

export const bigNumberValidationSchema = Yup.mixed()
  .required("form.validations.valueMissing")
  // @ts-ignore
  .isBigNumber("form.validations.valueMissing");
