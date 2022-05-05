import * as Yup from "yup";
import { BigNumber } from "ethers";

import { schema } from "./big-schema";

const ERROR_MESSAGE = "ERROR_MESSAGE";

describe("BigSchema", () => {
  const value = BigNumber.from("100");

  describe("typeError", () => {
    const schemaValidatorObject = Yup.object().shape({
      amount: schema.typeError(ERROR_MESSAGE),
    });

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
      ).rejects.toEqual(new Yup.ValidationError(ERROR_MESSAGE));
    });

    it("should fail Object", async () => {
      await expect(
        schemaValidatorObject.validate({
          amount: "qwerty",
        }),
      ).rejects.toEqual(new Yup.ValidationError(ERROR_MESSAGE));
    });

    it("should fail Object", async () => {
      const schemaValidatorObject = Yup.object().shape({
        amount: schema.typeError(ERROR_MESSAGE),
      });
      await expect(
        schemaValidatorObject.validate({
          amount: "qwerty",
        }),
      ).rejects.toEqual(new Yup.ValidationError(ERROR_MESSAGE));
    });
  });

  describe("min", () => {
    it("should validate min (BigNumber)", async () => {
      const schemaValidatorObject = Yup.object().shape({
        amount: schema.min(BigNumber.from("1000")),
      });
      await expect(
        schemaValidatorObject.validate({
          amount: "10000",
        }),
      ).resolves.toEqual({
        amount: BigNumber.from("10000"),
      });
    });

    it("should validate min (BigNumber)", async () => {
      const schemaValidatorObject = Yup.object().shape({
        amount: schema.min(BigNumber.from("1000")),
      });
      await expect(
        schemaValidatorObject.validate({
          amount: value,
        }),
      ).rejects.toEqual(new Yup.ValidationError("form.validations.rangeUnderflow"));
    });

    it("should validate min (string)", async () => {
      const schemaValidatorObject = Yup.object().shape({
        amount: schema.min("1000"),
      });
      await expect(
        schemaValidatorObject.validate({
          amount: value,
        }),
      ).rejects.toEqual(new Yup.ValidationError("form.validations.rangeUnderflow"));
    });

    it("should validate min (number)", async () => {
      const schemaValidatorObject = Yup.object().shape({
        amount: schema.min(1000),
      });
      await expect(
        schemaValidatorObject.validate({
          amount: value,
        }),
      ).rejects.toEqual(new Yup.ValidationError("form.validations.rangeUnderflow"));
    });

    it("should validate with custom message", async () => {
      const schemaValidatorObject = Yup.object().shape({
        amount: schema.min(1000, ERROR_MESSAGE),
      });
      await expect(
        schemaValidatorObject.validate({
          amount: value,
        }),
      ).rejects.toEqual(new Yup.ValidationError(ERROR_MESSAGE));
    });
  });
});
