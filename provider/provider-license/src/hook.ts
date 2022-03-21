import { useContext } from "react";

import { LicenseContext } from "./context";

export function useLicense() {
  return useContext(LicenseContext);
}
