import React, { PropsWithChildren, ReactElement, useContext, useEffect, useState } from "react";

import { UserContext, IUserContext } from "@gemunion/provider-user";

import { SettingsContext } from "./context";

interface ISettings<T extends string> {
  language?: T;
}

interface ISettingsProviderProps<T extends string> {
  defaultLanguage: T;
}

const STORAGE_NAME = "settings";

export const SettingsProvider = <T extends string, U extends any>(
  props: PropsWithChildren<ISettingsProviderProps<T>>,
): ReactElement | null => {
  const { children, defaultLanguage } = props;
  const [settings, setSettings] = useState<ISettings<T>>({});

  const user = useContext<IUserContext<U>>(UserContext);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_NAME);
    setSettings(data ? JSON.parse(data) : {});
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

  return (
    <SettingsContext.Provider
      value={{
        getLanguage,
        setLanguage,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
