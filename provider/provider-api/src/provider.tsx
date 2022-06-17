import { FC, ReactNode } from "react";
import { IJwt } from "@gemunion/types-jwt";

import { ApiContext } from "./context";
import { fetchFile, fetchJson } from "./fetch";
import { getToken, setToken, isRefreshTokenExpired, isAccessTokenExpired, prepare } from "./utils";

export interface IApiProviderProps {
  children?: ReactNode;
  baseUrl: string;
  storageName?: string;
  refreshToken: () => Promise<any> | void;
  getAuthToken: () => Promise<any>;
  customIsAccessTokenExpired?: (key: string) => () => boolean;
  customIsRefreshTokenExpired?: (key: string) => () => boolean;
  customSetToken?: (key: string) => (jwt: IJwt | null) => void;
  customGetToken?: (key: string) => () => IJwt | null;
}

export const ApiProvider: FC<IApiProviderProps> = props => {
  const {
    baseUrl,
    customIsAccessTokenExpired,
    customIsRefreshTokenExpired,
    customGetToken,
    customSetToken,
    getAuthToken,
    refreshToken,
    storageName = "jwt",
  } = props;

  const isAccessTokenExpiredCallback = customIsAccessTokenExpired
    ? customIsAccessTokenExpired(storageName)
    : isAccessTokenExpired(storageName);

  const isRefreshTokenExpiredCallback = customIsRefreshTokenExpired
    ? customIsRefreshTokenExpired(storageName)
    : isRefreshTokenExpired(storageName);

  const getTokenCallback = customGetToken ? customGetToken(storageName) : getToken(storageName);
  const setTokenCallback = customSetToken ? customSetToken(storageName) : setToken(storageName);

  return (
    <ApiContext.Provider
      value={{
        fetchJson: prepare({ fetch: fetchJson, baseUrl, getAuthToken }),
        fetchFile: prepare({ fetch: fetchFile, baseUrl, getAuthToken }),
        getToken: getTokenCallback,
        setToken: setTokenCallback,
        isAccessTokenExpired: isAccessTokenExpiredCallback,
        isRefreshTokenExpired: isRefreshTokenExpiredCallback,
        refreshToken,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};
