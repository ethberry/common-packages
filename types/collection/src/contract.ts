import { IIdDateBase } from "./base";

export interface IDeployable extends IIdDateBase {
  address: string;
  chainId: number;
}
