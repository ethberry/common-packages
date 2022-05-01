import { constants } from "ethers";

import { prepareEip712 } from "./eip712";

describe("EIP 712", () => {
  it("bytes32", () => {
    expect(
      prepareEip712({
        a: new Uint8Array(),
      }),
    ).toEqual([{ name: "a", type: "bytes32" }]);
  });

  it("uint256", () => {
    expect(
      prepareEip712({
        a: 12345,
      }),
    ).toEqual([{ name: "a", type: "uint256" }]);
  });

  it("uint256", () => {
    expect(
      prepareEip712({
        a: constants.WeiPerEther,
      }),
    ).toEqual([{ name: "a", type: "uint256" }]);
  });

  it("string", () => {
    expect(
      prepareEip712({
        a: "qwerty",
      }),
    ).toEqual([{ name: "a", type: "string" }]);
  });

  it("address", () => {
    expect(
      prepareEip712({
        a: constants.AddressZero,
      }),
    ).toEqual([{ name: "a", type: "address" }]);
  });

  it("boolean", () => {
    expect(
      prepareEip712({
        a: true,
      }),
    ).toEqual([{ name: "a", type: "boolean" }]);
  });

  it("uint256[]", () => {
    expect(
      prepareEip712({
        a: [12345],
      }),
    ).toEqual([{ name: "a", type: "uint256[]" }]);
  });

  it("uint256[]", () => {
    expect(
      prepareEip712({
        a: [constants.WeiPerEther],
      }),
    ).toEqual([{ name: "a", type: "uint256[]" }]);
  });

  it("string[]", () => {
    expect(
      prepareEip712({
        a: ["qwerty"],
      }),
    ).toEqual([{ name: "a", type: "string[]" }]);
  });

  it("address[]", () => {
    expect(
      prepareEip712({
        a: [constants.AddressZero],
      }),
    ).toEqual([{ name: "a", type: "address[]" }]);
  });

  it("boolean[]", () => {
    expect(
      prepareEip712({
        a: [true],
      }),
    ).toEqual([{ name: "a", type: "boolean[]" }]);
  });
});
