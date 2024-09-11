export interface IServerSignature {
  nonce: string;
  signature: string;
  expiresAt: number;
  bytecode?: string;
}

export interface ISignatureAsset {
  tokenType: number;
  token: string;
  tokenId: string;
  amount: string;
}

export interface ISignatureParams {
  externalId: number | string;
  expiresAt: number;
  nonce: Uint8Array;
  extra: string;
  receiver: string;
  referrer: string;
}
