import { PropsWithChildren, ReactElement, useContext, useEffect, useState } from "react";

import { IUser, useUser } from "@gemunion/provider-user";
import { EnabledLanguages, ThemeType } from "@gemunion/constants";

import { ISettingsContext, SettingsContext } from "./context";

interface ISettings<T extends string> {
  language?: T;
  themeType?: ThemeType;
}

interface ISettingsProviderProps<T extends string> {
  defaultLanguage?: T;
  defaultThemeType?: ThemeType;
}

const STORAGE_NAME = "settings";

export const SettingsProvider = <T extends string>(
  props: PropsWithChildren<ISettingsProviderProps<T>>,
): ReactElement | null => {
  const { children, defaultLanguage = EnabledLanguages.EN, defaultThemeType = ThemeType.light } = props;
  const [settings, setSettings] = useState<ISettings<T>>({});

  const user = useUser<IUser>();

  const read = (key: string): ISettings<T> => {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as ISettings<T>) : {};
  };

  const save = (key: string, data: ISettings<T> | null): void => {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
  };

  useEffect(() => {
    setSettings(read(STORAGE_NAME));
  }, []);

  const getLanguage = (): T => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return settings.language || (user.isAuthenticated() && user.profile.language) || defaultLanguage;
  };

  const setLanguage = (language: T): void => {
    const newSettings = { ...settings, language };
    setSettings(newSettings);
    save(STORAGE_NAME, newSettings);
  };

  const getTheme = (): ThemeType => {
    return settings.themeType || defaultThemeType;
  };

  const setTheme = (themeType: ThemeType): void => {
    const newSettings = { ...settings, themeType };
    setSettings(newSettings);
    save(STORAGE_NAME, newSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        getLanguage,
        setLanguage,
        getTheme,
        setTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings<T extends string = any>() {
  return useContext<ISettingsContext<T>>(SettingsContext);
}
