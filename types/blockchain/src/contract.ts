import { IIdDateBase } from "@gemunion/types-collection";

export interface IDeployable extends IIdDateBase {
  address: string;
  chainId: number;
}
