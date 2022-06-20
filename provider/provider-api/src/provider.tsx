import { FC, ReactNode } from "react";

import { ns } from "@gemunion/constants";

import { ApiContext } from "./context";
import { fetchFile, fetchJson } from "./fetch";
import {
  getToken,
  setToken,
  isRefreshTokenExpired,
  isAccessTokenExpired,
  prepare,
  setBaseUrl,
  setStorageName,
} from "./utils";

export interface IApiProviderProps {
  children?: ReactNode;
  baseUrl: string;
  storageName?: string;
}

export interface IApiProviderBaseProps {
  refreshToken?: () => Promise<any>;
  getAuthToken?: () => Promise<string>;
  customIsAccessTokenExpired?: () => boolean;
  customIsRefreshTokenExpired?: () => boolean;
}

export const ApiProvider: FC<IApiProviderBaseProps & IApiProviderProps> = props => {
  const {
    baseUrl,
    customIsAccessTokenExpired,
    customIsRefreshTokenExpired,
    getAuthToken = () => Promise.resolve(""),
    refreshToken = () => Promise.resolve(),
    storageName = ns,
  } = props;

  const initializeProvider = (): void => {
    setBaseUrl(baseUrl);
    storageName && setStorageName(`jwt_${storageName}`);
  };
  initializeProvider();

  return (
    <ApiContext.Provider
      value={{
        fetchJson: prepare({ fetch: fetchJson, getAuthToken }),
        fetchFile: prepare({ fetch: fetchFile, getAuthToken }),
        getToken,
        setToken,
        isAccessTokenExpired: customIsAccessTokenExpired || isAccessTokenExpired,
        isRefreshTokenExpired: customIsRefreshTokenExpired || isRefreshTokenExpired,
        refreshToken,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};
