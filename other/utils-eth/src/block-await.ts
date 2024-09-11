import { JsonRpcProvider } from "ethers";

import { delay } from "@gemunion/utils";

export const blockAwait = async function (provider: JsonRpcProvider, blockDelay = 2): Promise<void> {
  const initialBlock = await provider.getBlock("latest");
  if (!initialBlock) {
    throw Error("latest block is null");
  }
  let currentBlock;
  let delayB;
  do {
    await delay(5000);
    currentBlock = await provider.getBlock("latest");
    if (!currentBlock) {
      throw Error("latest block is null");
    }
    delayB = currentBlock.number - initialBlock.number;
  } while (delayB < blockDelay);
};
