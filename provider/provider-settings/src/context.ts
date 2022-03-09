import { createContext } from "react";

import { ThemeType } from "@gemunion/constants";

export interface ISettingsContext {
  setLanguage: (language: string) => void;
  getLanguage: () => string;
  setTheme: (theme: ThemeType) => void;
  getTheme: () => ThemeType;
}

export const SettingsContext = createContext<ISettingsContext>(undefined!);
