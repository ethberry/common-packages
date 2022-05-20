import { FC, useContext } from "react";

import { history } from "@gemunion/history";
import { IJwt } from "@gemunion/types-jwt";

import { ApiContext, IFetchProps } from "./context";
import { fetchFile, fetchJson } from "./fetch";

interface IApiProviderProps {
  baseUrl: string;
  storageName?: string;
}

export const ApiProvider: FC<IApiProviderProps> = props => {
  const { baseUrl, storageName = "jwt", children } = props;

  const read = (key: string): IJwt | null => {
    const jwt = localStorage.getItem(key);
    return jwt ? (JSON.parse(jwt) as IJwt) : null;
  };

  const save = (key: string, jwt: IJwt | null): void => {
    const json = JSON.stringify(jwt);
    localStorage.setItem(key, json);
  };

  const setToken = (jwt: IJwt | null): void => {
    return save(storageName, jwt);
  };

  const getToken = (): IJwt | null => {
    return read(storageName);
  };

  const isAccessTokenExpired = (): boolean => {
    const jwt = getToken();

    return !!jwt && jwt.accessTokenExpiresAt < Date.now();
  };

  const isRefreshTokenExpired = (): boolean => {
    const jwt = getToken();

    return !!jwt && jwt.refreshTokenExpiresAt < Date.now();
  };

  const refreshToken = (): Promise<any> | void => {
    const jwt = getToken();

    if (jwt) {
      return fetchJson(`${baseUrl}/auth/refresh`, {
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
        }),
        credentials: "include",
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          refreshToken: jwt.refreshToken,
        }),
      })
        .then((json: IJwt) => {
          setToken(json);
          return json;
        })
        .catch(e => {
          console.error(e);
          setToken(null);
          return null;
        });
    }
  };

  const getAuthToken = async () => {
    let jwt = getToken();

    if (jwt) {
      if (isAccessTokenExpired()) {
        if (isRefreshTokenExpired()) {
          history.push("/login");
          setToken(null);
          throw Object.assign(new Error("unauthorized"), { status: 401 });
        }

        jwt = await refreshToken();
      }
    }

    return jwt ? jwt.accessToken : "";
  };

  const prepare =
    (fetch: (input: RequestInfo, init?: RequestInit) => Promise<any>) =>
    async (props: IFetchProps): Promise<any> => {
      const { url, method = "GET", data = {}, signal } = props;
      const newUrl = new URL(`${baseUrl}${url}`);
      const hasData = method === "POST" || method === "PUT" || method === "PATCH";

      const headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Authorization", `Bearer ${await getAuthToken()}`);

      if (!(data instanceof FormData)) {
        if (hasData) {
          headers.append("Content-Type", "application/json; charset=utf-8");
        } else {
          Object.keys(data).forEach(key => {
            if (Array.isArray(data[key])) {
              data[key].map((value: string) => newUrl.searchParams.append(`${key}[]`, value));
            } else {
              newUrl.searchParams.append(key, data[key] as string);
            }
          });
        }
      }

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

export function useApi() {
  return useContext(ApiContext);
}
