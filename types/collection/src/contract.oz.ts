import { IContract } from "./contract";

export enum OzPermissionType {
  ACCESS_CONTROL = "ACCESS_CONTROL",
  OWNABLE = "OWNABLE",
  UNKNOWN = "UNKNOWN",
}

export interface IOzContract extends IContract {
  permissionType: OzPermissionType;
}
