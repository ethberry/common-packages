import { JsonRpcProvider } from "ethers";

import { delay } from "@gemunion/utils";

export const waitForConfirmation = async function (
  provider: JsonRpcProvider,
  blockDelay = 1,
  millisecondsDelay = 1000,
): Promise<void> {
  const initialBlockNumber = await provider.getBlockNumber();
  if (!initialBlockNumber) {
    throw Error("Unable to retrieve the block number");
  }

  while (true) {
    await delay(millisecondsDelay);
    const currentBlockNumber = await provider.getBlockNumber();
    if (!currentBlockNumber) {
      throw new Error("Unable to retrieve the block number");
    }

    if (currentBlockNumber - initialBlockNumber >= blockDelay) {
      break;
    }
  }
};
