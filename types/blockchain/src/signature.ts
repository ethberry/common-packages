export interface IServerSignature {
  nonce: string;
  signature: string;
  expiresAt: number;
  bytecode?: string;
}

export interface IAsset {
  tokenType: number;
  token: string;
  tokenId: string;
  amount: string;
}

export interface IParams {
  nonce: Uint8Array;
  externalId: number;
  expiresAt: number;
  referrer: string;
}
