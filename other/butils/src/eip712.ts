import { BigNumber, utils } from "ethers";

export interface IEip712Types {
  name: string;
  type: string;
}

export type TEip712 =
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

export const prepareEip712 = function (data: Record<string, TEip712>): { EIP712: Array<IEip712Types> } {
  return {
    EIP712: Object.keys(data).reduce((memo, current) => {
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
    }, [] as Array<IEip712Types>),
  };
};
