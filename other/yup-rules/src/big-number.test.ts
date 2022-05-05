import * as Yup from "yup";
import { BigNumber } from "ethers";

import "./big-number";

const ERROR_MESSAGE = "ERROR_MESSAGE";

const schemaValidatorObject = Yup.object().shape({
  // @ts-ignore
  amount: Yup.mixed().isBigNumber(ERROR_MESSAGE),
});

describe("BigNumber", () => {
  it("should validate BigNumber", async () => {
    const value = BigNumber.from("100");
    await expect(
      schemaValidatorObject.validate({
        amount: value,
      }),
    ).resolves.toEqual({
      amount: value,
    });
  });

  it("should validate Number", async () => {
    const value = 100;
    await expect(
      schemaValidatorObject.validate({
        amount: value,
      }),
    ).resolves.toEqual({
      amount: value,
    });
  });

  it("should validate String", async () => {
    const value = "100";
    await expect(
      schemaValidatorObject.validate({
        amount: value,
      }),
    ).resolves.toEqual({
      amount: value,
    });
  });

  it("should fail String", async () => {
    await expect(
      schemaValidatorObject.validate({
        amount: "qwerty",
      }),
    ).rejects.toEqual(new Yup.ValidationError(ERROR_MESSAGE));
  });

  it("should fail Object", async () => {
    await expect(
      schemaValidatorObject.validate({
        amount: "qwerty",
      }),
    ).rejects.toEqual(new Yup.ValidationError(ERROR_MESSAGE));
  });
});
