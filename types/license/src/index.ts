import { IUuidBase } from "@gemunion/types-collection";

export enum LicenseStatus {
  ACTIVE = "ACTIVE",
  REVOKED = "REVOKED",
  EXPIRED = "EXPIRED",
}

export interface ILicense extends IUuidBase {
  title: string;
  status: LicenseStatus;
  expiresAt: string;
  crafterAt: string;
}
