import { IIdDateBase } from "@ethberry/types-collection";

export interface IDeployable extends IIdDateBase {
  address: string;
  chainId: number;
}
