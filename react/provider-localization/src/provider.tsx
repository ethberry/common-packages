import React, { PropsWithChildren, ReactElement, useContext } from "react";
import { IntlProvider } from "react-intl";

import { ISettingsContext, SettingsContext } from "@gemunion/provider-settings";

import { flattenMessages } from "./utils";

interface ILocalizationProviderProps<T extends string> {
  i18n: Record<T, any>;
  defaultLanguage: T;
}

export const LocalizationProvider = <T extends string>(
  props: PropsWithChildren<ILocalizationProviderProps<T>>,
): ReactElement | null => {
  const { children, i18n, defaultLanguage } = props;
  const settings = useContext<ISettingsContext<T>>(SettingsContext);

  return (
    <IntlProvider
      defaultLocale={defaultLanguage}
      locale={settings.getLanguage()}
      messages={Object.assign(flattenMessages(i18n[defaultLanguage]), flattenMessages(i18n[settings.getLanguage()]))}
    >
      {children}
    </IntlProvider>
  );
};
