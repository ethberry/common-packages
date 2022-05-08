import * as Yup from "yup";
import { BigNumber } from "ethers";

import { bigNumberValidationSchema } from "./big-number";

const schemaValidatorObject = Yup.object().shape({
  // @ts-ignore
  amount: bigNumberValidationSchema,
});

describe("BigNumber", () => {
  const value = BigNumber.from("100");
  it("should validate BigNumber", async () => {
    await expect(
      schemaValidatorObject.validate({
        amount: value,
      }),
    ).resolves.toEqual({
      amount: value,
    });
  });

  it("should validate Number", async () => {
    await expect(
      schemaValidatorObject.validate({
        amount: 100,
      }),
    ).resolves.toEqual({
      amount: value,
    });
  });

  it("should validate String", async () => {
    await expect(
      schemaValidatorObject.validate({
        amount: "100",
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
    ).rejects.toEqual(new Yup.ValidationError("form.validations.badInput"));
  });

  it("should fail Object", async () => {
    await expect(
      schemaValidatorObject.validate({
        amount: "qwerty",
      }),
    ).rejects.toEqual(new Yup.ValidationError("form.validations.badInput"));
  });

  it("should fail Object", async () => {
    const schemaValidatorObject = Yup.object().shape({
      // @ts-ignore
      amount: bigNumberValidationSchema.min(BigNumber.from("1000")),
    });
    await expect(
      schemaValidatorObject.validate({
        amount: value,
      }),
    ).rejects.toEqual(new Yup.ValidationError("form.validations.rangeUnderflow"));
  });
});
