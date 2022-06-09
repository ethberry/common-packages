import { IIdDateBase } from "./base";

export interface IContract extends IIdDateBase {
  address: string;
  chainId: number;
}
