import { IIdBase } from "./base";

export interface IContract extends IIdBase {
  address: string;
  chainId: number;
}
