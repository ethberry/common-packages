import { BigNumber, utils } from "ethers";

export interface IEip712Types {
  name: string;
  type: string;
}

export type TEip712 = Uint8Array | BigNumber | string | number | boolean;

const dict = {
  Uint8Array: "bytes32",
  BigNumber: "uint256",
  Number: "uint256",
  Boolean: "boolean",
  String: "string",
};

export const prepareEip712 = function (data: Record<string, TEip712>): Array<IEip712Types> {
  return Object.keys(data).reduce((memo, current) => {
    let type = dict[data[current].constructor.name as keyof typeof dict];

    if (type === "string") {
      try {
        utils.getAddress(data[current] as string);
        type = "address";
      } catch (_e) {}
    }

    memo.push({
      name: current,
      type,
    });

    return memo;
  }, [] as Array<IEip712Types>);
};
