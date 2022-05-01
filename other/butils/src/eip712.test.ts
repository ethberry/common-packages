import { constants } from "ethers";

import { prepareEip712 } from "./eip712";

describe("EIP 712", () => {
  it("bytes32", () => {
    expect(
      prepareEip712({
        a: new Uint8Array(),
      }),
    ).toEqual({ EIP712: [{ name: "a", type: "bytes32" }] });
  });

  it("uint256", () => {
    expect(
      prepareEip712({
        a: 12345,
      }),
    ).toEqual({ EIP712: [{ name: "a", type: "uint256" }] });
  });

  it("uint256", () => {
    expect(
      prepareEip712({
        a: constants.WeiPerEther,
      }),
    ).toEqual({ EIP712: [{ name: "a", type: "uint256" }] });
  });

  it("string", () => {
    expect(
      prepareEip712({
        a: "qwerty",
      }),
    ).toEqual({ EIP712: [{ name: "a", type: "string" }] });
  });

  it("address", () => {
    expect(
      prepareEip712({
        a: constants.AddressZero,
      }),
    ).toEqual({ EIP712: [{ name: "a", type: "address" }] });
  });

  it("boolean", () => {
    expect(
      prepareEip712({
        a: true,
      }),
    ).toEqual({ EIP712: [{ name: "a", type: "boolean" }] });
  });

  it("uint256[]", () => {
    expect(
      prepareEip712({
        a: [12345],
      }),
    ).toEqual({ EIP712: [{ name: "a", type: "uint256[]" }] });
  });

  it("uint256[]", () => {
    expect(
      prepareEip712({
        a: [constants.WeiPerEther],
      }),
    ).toEqual({ EIP712: [{ name: "a", type: "uint256[]" }] });
  });

  it("string[]", () => {
    expect(
      prepareEip712({
        a: ["qwerty"],
      }),
    ).toEqual({ EIP712: [{ name: "a", type: "string[]" }] });
  });

  it("address[]", () => {
    expect(
      prepareEip712({
        a: [constants.AddressZero],
      }),
    ).toEqual({ EIP712: [{ name: "a", type: "address[]" }] });
  });

  it("boolean[]", () => {
    expect(
      prepareEip712({
        a: [true],
      }),
    ).toEqual({ EIP712: [{ name: "a", type: "boolean[]" }] });
  });

  it("mix", () => {
    expect(
      prepareEip712({
        a: true,
        b: [true],
      }),
    ).toEqual({
      EIP712: [
        { name: "a", type: "boolean" },
        { name: "b", type: "boolean[]" },
      ],
    });
  });

  it("domain", () => {
    expect(
      prepareEip712(
        {
          a: true,
        },
        "NFT",
      ),
    ).toEqual({
      NFT: [{ name: "a", type: "boolean" }],
    });
  });
});
