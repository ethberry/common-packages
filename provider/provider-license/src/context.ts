import { createContext } from "react";

export interface ILicenseContext {
  isValid: () => boolean;
  refresh: () => Promise<void>;
}

export const LicenseContext = createContext<ILicenseContext>(undefined!);
