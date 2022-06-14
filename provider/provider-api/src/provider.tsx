import { FC } from "react";
import { stringify } from "qs";

import { IJwt } from "@gemunion/types-jwt";

import { ApiContext, IFetchProps } from "./context";
import { fetchFile, fetchJson } from "./fetch";

export interface IAuthStrategy {
  refreshToken: () => Promise<IJwt | null>;
  getAuthToken: () => Promise<string>;
  setToken: (jwt: IJwt | null) => void;
  getToken: () => IJwt | null;
  isAccessTokenExpired: () => boolean;
  isRefreshTokenExpired: () => boolean;
}

export interface IApiProviderProps {
  baseUrl: string;
  storageName?: string;
}

export const ApiProvider: FC<
  IApiProviderProps & { getAuthStrategy: (props: IApiProviderProps) => IAuthStrategy }
> = props => {
  const { baseUrl, storageName = "jwt", getAuthStrategy, children } = props;

  const authStrategy = getAuthStrategy({
    baseUrl,
    storageName,
  });

  const setToken = (jwt: IJwt | null): void => {
    return authStrategy.setToken(jwt);
  };

  const getToken = (): IJwt | null => {
    return authStrategy.getToken();
  };

  const isAccessTokenExpired = (): boolean => {
    return authStrategy.isAccessTokenExpired();
  };

  const isRefreshTokenExpired = (): boolean => {
    return authStrategy.isRefreshTokenExpired();
  };

  const refreshToken = (): Promise<any> | void => {
    return authStrategy.refreshToken();
  };

  const getAuthToken = (): Promise<string> => {
    return authStrategy.getAuthToken();
  };

  const prepare =
    (fetch: (input: RequestInfo, init?: RequestInit) => Promise<any>) =>
    async (props: IFetchProps): Promise<any> => {
      const { url, method = "GET", data = {}, signal } = props;
      let queryString = "";

      const hasData = method === "POST" || method === "PUT" || method === "PATCH";
      const headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Authorization", `Bearer ${await getAuthToken()}`);

      if (!(data instanceof FormData)) {
        if (hasData) {
          headers.append("Content-Type", "application/json; charset=utf-8");
        } else {
          queryString = data ? `?${stringify(data)}` : "";
        }
      }
      const newUrl = new URL(`${baseUrl}${url}${queryString}`);

      return fetch(newUrl.toString(), {
        signal,
        headers,
        credentials: "include",
        mode: "cors",
        method,
        body: hasData ? (data instanceof FormData ? data : JSON.stringify(data)) : void 0,
      });
    };

  return (
    <ApiContext.Provider
      value={{
        fetchJson: prepare(fetchJson),
        fetchFile: prepare(fetchFile),
        setToken,
        getToken,
        isAccessTokenExpired,
        isRefreshTokenExpired,
        refreshToken,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
