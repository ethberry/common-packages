import { createContext } from "react";

export interface ISettingsContext<T extends string> {
  setLanguage: (language: T) => void;
  getLanguage: () => T;
}

export const SettingsContext = createContext<ISettingsContext<any>>(undefined!);
