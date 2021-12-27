export enum Networks {
  ETHEREUM = "ETHEREUM",
  BINANCE = "BINANCE",
  POLYGON = "POLYGON",
  OPTIMISM = "OPTIMISM",
  ARBITRUM = "ARBITRUM",
}

export const networkToChainId = {
  [Networks.ETHEREUM]: 1,
  [Networks.BINANCE]: 56,
  [Networks.POLYGON]: 137,
  [Networks.OPTIMISM]: 10,
  [Networks.ARBITRUM]: 42161,
};
