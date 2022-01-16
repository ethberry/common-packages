import { PropsWithChildren, ReactElement, useContext, useEffect, useState } from "react";

import { UserContext, IUserContext } from "@gemunion/provider-user";
import { EnabledLanguages, ThemeType } from "@gemunion/constants";

import { SettingsContext } from "./context";

interface ISettings<T extends string> {
  language?: T;
  themeType?: ThemeType;
}

interface ISettingsProviderProps<T extends string> {
  defaultLanguage?: T;
  defaultThemeType?: ThemeType;
}

const STORAGE_NAME = "settings";

export const SettingsProvider = <T extends string, U>(
  props: PropsWithChildren<ISettingsProviderProps<T>>,
): ReactElement | null => {
  const { children, defaultLanguage = EnabledLanguages.EN, defaultThemeType = ThemeType.light } = props;
  const [settings, setSettings] = useState<ISettings<T>>({});

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const user = useContext<IUserContext<U>>(UserContext);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_NAME);
    setSettings(data ? (JSON.parse(data) as ISettings<T>) : {});
  }, []);

  const save = (key: string, data: any | null): void => {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
  };

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
