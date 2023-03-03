import { createContext } from "react";

import { ThemeType } from "@gemunion/constants";

import { LAYOUT_DIRECTION } from "./interfaces";

export interface ISettingsContext<T extends string> {
  setLanguage: (language: T) => void;
  getLanguage: () => T;
  setLayoutDirection: (layoutDirection: LAYOUT_DIRECTION) => void;
  getLayoutDirection: () => LAYOUT_DIRECTION;
  setTheme: (theme: ThemeType) => void;
  getTheme: () => ThemeType;
  setReferrer: (referrer: string) => void;
  getReferrer: () => string;
}

export const SettingsContext = createContext<ISettingsContext<any>>(undefined!);
