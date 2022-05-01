import { BigNumber, utils } from "ethers";
import { TypedDataField } from "@ethersproject/abstract-signer";

type TEIP712 =
  | Uint8Array
  | BigNumber
  | string
  | number
  | boolean
  | Array<BigNumber>
  | Array<string>
  | Array<number>
  | Array<boolean>;

const dict = {
  Uint8Array: "bytes32",
  BigNumber: "uint256",
  Number: "uint256",
  Boolean: "boolean",
  String: "string",
};

export const prepareEip712 = function (
  data: Record<string, TEIP712>,
  domain = "EIP712",
): Record<string, Array<TypedDataField>> {
  return {
    [domain]: Object.keys(data).reduce((memo, current) => {
      const isArray = Array.isArray(data[current]);
      const element = isArray ? (data[current] as Array<any>)[0] : data[current];
      let type = dict[element.constructor.name as keyof typeof dict];

      if (type === "string") {
        try {
          utils.getAddress(element as string);
          type = "address";
        } catch (_e) {}
      }

      memo.push({
        name: current,
        type: type + (isArray ? "[]" : ""),
      });

      return memo;
    }, [] as Array<TypedDataField>),
  };
};
