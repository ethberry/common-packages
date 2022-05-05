import { ISearchable } from "./search";

export enum OzPermissionType {
  ACCESS_CONTROL = "ACCESS_CONTROL",
  OWNABLE = "OWNABLE",
  UNKNOWN = "UNKNOWN",
}

export interface IOzContract extends ISearchable {
  address: string;
  permissionType: OzPermissionType;
}
