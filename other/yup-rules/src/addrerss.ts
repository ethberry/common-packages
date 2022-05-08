import * as Yup from "yup";
import { utils } from "ethers";

Yup.addMethod(Yup.string, "isEthereumAddress", function (errorMessage) {
  return this.test(`test-eth-addr`, errorMessage, function (value) {
    try {
      utils.getAddress(value as string);
    } catch (_e) {
      return false;
    }

    return true;
  });
});

export const addressValidationSchema = Yup.string()
  .required("form.validations.valueMissing")
  // @ts-ignore
  .isEthereumAddress("form.validations.patternMismatch");
