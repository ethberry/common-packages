import * as Yup from "yup";
import { constants } from "ethers";

import "./addrerss";

const ERROR_MESSAGE = "ERROR_MESSAGE";

const schemaValidatorObject = Yup.object().shape({
  // @ts-ignore
  description: Yup.string().isEthereumAddress(ERROR_MESSAGE),
});

describe("Address", () => {
  it("has no text", async () => {
    await expect(
      schemaValidatorObject.validate({
        description: "",
      }),
    ).rejects.toEqual(new Yup.ValidationError(ERROR_MESSAGE));
  });

  it("has wrong text", async () => {
    await expect(
      schemaValidatorObject.validate({
        description: "qwerty",
      }),
    ).rejects.toEqual(new Yup.ValidationError(ERROR_MESSAGE));
  });

  it("has wrong address", async () => {
    await expect(
      schemaValidatorObject.validate({
        description: constants.AddressZero,
      }),
    ).resolves.toEqual({
      description: constants.AddressZero,
    });
  });
});
