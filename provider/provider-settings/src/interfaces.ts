import { ThemeType } from "@gemunion/constants";

export interface ISettings<T extends string> {
  language?: T;
  layoutDirection?: LAYOUT_DIRECTION;
  themeType?: ThemeType;
  referrer?: string;
}

export interface ISettingsProviderProps<T extends string> {
  defaultLanguage?: T;
  defaultLayoutDirection?: LAYOUT_DIRECTION;
  defaultThemeType?: ThemeType;
  defaultReferrer?: string;
  storageName?: string;
}

export enum LAYOUT_DIRECTION {
  ltr = "ltr",
  rtl = "rtl",
}
