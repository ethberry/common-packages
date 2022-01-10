import { createContext } from "react";

import { ThemeType } from "@gemunion/constants";

export interface ISettingsContext<T extends string> {
  setLanguage: (language: T) => void;
  getLanguage: () => T;
  setTheme: (theme: ThemeType) => void;
  getTheme: () => ThemeType;
}

export const SettingsContext = createContext<ISettingsContext<any>>(undefined!);
