import { useContext } from "react";

import { ISettingsContext, SettingsContext } from "./context";

export function useSettings<T extends string = any>() {
  return useContext<ISettingsContext<T>>(SettingsContext);
}
