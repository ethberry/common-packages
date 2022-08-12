import { PropsWithChildren, ReactElement, useEffect, useState } from "react";

import { IUser, useUser } from "@gemunion/provider-user";
import { EnabledLanguages, ThemeType } from "@gemunion/constants";
import { useSearchParams } from "react-router-dom";

import { SettingsContext } from "./context";

interface ISettings<T extends string> {
  language?: T;
  themeType?: ThemeType;
  referrer?: string;
}

interface ISettingsProviderProps<T extends string> {
  defaultLanguage?: T;
  defaultThemeType?: ThemeType;
  defaultReferrer?: string;
  storageName?: string;
}

export const SettingsProvider = <T extends string>(
  props: PropsWithChildren<ISettingsProviderProps<T>>,
): ReactElement | null => {
  const {
    defaultLanguage = EnabledLanguages.EN,
    defaultThemeType = ThemeType.light,
    defaultReferrer = "0x0000000000000000000000000000000000000000", // do not import ethers!
    storageName = "settings",
    children,
  } = props;
  const [settings, setSettings] = useState<ISettings<T>>({});

  const user = useUser<IUser>();
  const [searchParams] = useSearchParams();

  const read = (key: string): ISettings<T> => {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as ISettings<T>) : {};
  };

  const save = (key: string, data: ISettings<T> | null): void => {
    const json = JSON.stringify(data);
    localStorage.setItem(key, json);
  };

  useEffect(() => {
    setSettings(read(storageName));
  }, []);

  const getLanguage = (): T => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return settings.language || (user.isAuthenticated() && user.profile.language) || defaultLanguage;
  };

  const setLanguage = (language: T): void => {
    const newSettings = { ...settings, language };
    setSettings(newSettings);
    save(storageName, newSettings);
  };

  const getTheme = (): ThemeType => {
    return settings.themeType || defaultThemeType;
  };

  const setTheme = (themeType: ThemeType): void => {
    const newSettings = { ...settings, themeType };
    setSettings(newSettings);
    save(storageName, newSettings);
  };

  const getReferrer = (): string => {
    return settings.referrer || defaultReferrer;
  };

  const setReferrer = (referrer: string | undefined): void => {
    const newSettings = { ...settings, referrer };
    setSettings(newSettings);
    save(storageName, newSettings);
  };

  useEffect(() => {
    const referrer = searchParams.get("referrer");
    if (referrer) {
      setReferrer(referrer);
    }
  }, [searchParams]);

  return (
    <SettingsContext.Provider
      value={{
        getLanguage,
        setLanguage,
        getTheme,
        setTheme,
        getReferrer,
        setReferrer,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
