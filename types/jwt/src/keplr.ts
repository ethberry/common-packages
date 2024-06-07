export interface IPubKey {
  type: string;
  value: string;
}

export interface IStdSignature {
  pub_key: IPubKey;
  signature: string;
}

export interface IKeplrDto {
  chainPrefix: string;
  nonce: string;
  signature: IStdSignature;
  wallet: string;
}
