import { addMethod, string } from "yup";
import { utils } from "ethers";

addMethod(string, "isEthereumAddress", function (errorMessage) {
  return this.test(`test-eth-addr`, errorMessage, function (value) {
    try {
      utils.getAddress(value as string);
    } catch (_e) {
      return false;
    }

    return true;
  });
});

export const addressValidationSchema = string()
  .required("form.validations.valueMissing")
  .isEthereumAddress("form.validations.patternMismatch");
