import { PropsWithChildren, ReactElement, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { EnabledLanguages, RTLLanguages, ThemeType } from "@gemunion/constants";
import { IUser, useUser } from "@gemunion/provider-user";

import { SettingsContext } from "./context";
import { ISettings, ISettingsProviderProps, LAYOUT_DIRECTION } from "./interfaces";
import { read, save } from "./utils";

export const SettingsProvider = <T extends string>(
  props: PropsWithChildren<ISettingsProviderProps<T>>,
): ReactElement | null => {
  const {
    defaultLanguage = EnabledLanguages.EN,
    defaultLayoutDirection = LAYOUT_DIRECTION.ltr,
    defaultThemeType = ThemeType.light,
    defaultReferrer = "0x0000000000000000000000000000000000000000", // do not import ethers!
    storageName = "settings",
    children,
  } = props;
  const [settings, setSettings] = useState<ISettings<T>>(read(storageName));
  const user = useUser<IUser>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setSettings(read(storageName));
  }, []);

  const getLanguage = (): T => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return settings.language || (user.isAuthenticated() && user.profile.language) || defaultLanguage;
  };

  const setLanguage = useCallback(
    (language: T): void => {
      const newSettings = { ...settings, language };
      setSettings(newSettings);
      save(storageName, newSettings);
    },
    [settings],
  );

  const getLayoutDirection = (): LAYOUT_DIRECTION => {
    return settings.layoutDirection || defaultLayoutDirection;
  };

  const setLayoutDirection = useCallback(
    (layoutDirection: LAYOUT_DIRECTION): void => {
      const newSettings = { ...settings, layoutDirection };
      setSettings(newSettings);
      save(storageName, newSettings);
    },
    [settings],
  );

  const getTheme = (): ThemeType => {
    return settings.themeType || defaultThemeType;
  };

  const setTheme = useCallback(
    (themeType: ThemeType): void => {
      const newSettings = { ...settings, themeType };
      setSettings(newSettings);
      save(storageName, newSettings);
    },
    [settings],
  );

  const getReferrer = (): string => {
    return settings.referrer || defaultReferrer;
  };

  const setReferrer = useCallback(
    (referrer: string | undefined): void => {
      const newSettings = { ...settings, referrer };
      setSettings(newSettings);
      save(storageName, newSettings);
    },
    [settings],
  );

  useEffect(() => {
    const referrer = searchParams.get("referrer");
    if (referrer) {
      setReferrer(referrer);
    }
  }, [searchParams]);

  useEffect(() => {
    if (settings.language === RTLLanguages.AR) {
      setLayoutDirection(LAYOUT_DIRECTION.rtl);
    } else {
      setLayoutDirection(LAYOUT_DIRECTION.ltr);
    }
  }, [settings.language]);

  return (
    <SettingsContext.Provider
      value={{
        getLanguage,
        setLanguage,
        getLayoutDirection,
        setLayoutDirection,
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
