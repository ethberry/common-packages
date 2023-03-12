import { Schema } from "yup";
import { BigNumber } from "ethers";

const isAbsent = (value: any): value is undefined | null => value == null;

export class BigNumberSchema extends Schema {
  static create() {
    return new BigNumberSchema();
  }

  constructor() {
    super({ type: "bigNumber" } as any);

    this.withMutation(() => {
      this.transform(function (value: any, originalValue) {
        if (this.isType(value)) {
          return BigNumber.from(originalValue);
        }
        this.typeError("form.validations.badInput");
        return value as unknown;
      });
    });
  }

  min(min: BigNumber | string | number, message = "form.validations.rangeUnderflow") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.test({
      message,
      name: "min",
      exclusive: true,
      params: { min },
      test(value: BigNumber) {
        return isAbsent(value) || value.gte(this.resolve(min));
      },
    });
  }

  max(max: BigNumber | string | number, message = "form.validations.rangeOverflow") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.test({
      message,
      name: "max",
      exclusive: true,
      params: { max },
      test(value: BigNumber) {
        return isAbsent(value) || value.lte(this.resolve(max));
      },
    });
  }

  lessThan(less: BigNumber | string | number, message = "form.validations.rangeOverflow") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.test({
      message,
      name: "max",
      exclusive: true,
      params: { less },
      test(value: BigNumber) {
        return isAbsent(value) || value.lt(this.resolve(less));
      },
    });
  }

  moreThan(more: BigNumber | string | number, message = "form.validations.rangeUnderflow") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.test({
      message,
      name: "min",
      exclusive: true,
      params: { more },
      test(value: BigNumber) {
        return isAbsent(value) || value.gt(this.resolve(more));
      },
    });
  }

  _typeCheck = (value: any): value is any => {
    const type = Object.prototype.toString.call(value).slice(8, -1);
    switch (type) {
      case "Number":
      case "String":
        try {
          BigNumber.from(value);
          return true;
        } catch (_e) {}
        return false;
      case "Object":
        return BigNumber.isBigNumber(value);
      default:
        return false;
    }
  };
}

export const schema = new BigNumberSchema();
