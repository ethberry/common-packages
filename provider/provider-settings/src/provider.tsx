import { PropsWithChildren, ReactElement, useContext, useEffect, useState } from "react";

import { useUser, IUser } from "@gemunion/provider-user";
import { EnabledLanguages, ThemeType } from "@gemunion/constants";

import { SettingsContext } from "./context";

interface ISettings {
  language?: string;
  themeType?: ThemeType;
}

interface ISettingsProviderProps {
  defaultLanguage?: string;
  defaultThemeType?: ThemeType;
}

const STORAGE_NAME = "settings";

export const SettingsProvider = <T extends IUser>(
  props: PropsWithChildren<ISettingsProviderProps>,
): ReactElement | null => {
  const { children, defaultLanguage = EnabledLanguages.EN, defaultThemeType = ThemeType.light } = props;
  const [settings, setSettings] = useState<ISettings>({});

  const user = useUser<T>();

  const read = (key: string): ISettings => {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as ISettings) : {};
  };

  const save = (key: string, data: ISettings | null): void => {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
  };

  useEffect(() => {
    setSettings(read(STORAGE_NAME));
  }, []);

  const getLanguage = (): string => {
    return settings.language || (user.isAuthenticated() && user.profile.language) || defaultLanguage;
  };

  const setLanguage = (language: string): void => {
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

export function useSettings() {
  return useContext(SettingsContext);
}
