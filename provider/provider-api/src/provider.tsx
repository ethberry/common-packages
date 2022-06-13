import { FC, useEffect, useRef } from "react";
import { stringify } from "qs";
import { getAuth } from "firebase/auth";

import firebase from "@gemunion/firebase";
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

  const authFb = getAuth(firebase);
  const timerId = useRef<any>(null);

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

    if (!jwt) {
      history.push("/login");
      setToken(null);
    }

    timerId.current = null;

    return authFb.currentUser
      ?.getIdToken(true)
      .then(accessToken => {
        const now = Date.now();

        timerId.current = window.setTimeout(() => {
          void refreshToken();
        }, 10000); // launch refreshToken in 4 minutes

        setToken({
          accessToken,
          accessTokenExpiresAt: now + 1000 * 60 * 60,
          refreshToken: "",
          refreshTokenExpiresAt: now + 1000 * 60 * 60,
        });
      })
      .catch((e: any) => {
        setToken(null);
        console.error(e);
      });
  };

  const getAuthToken = async () => {
    let jwt = getToken();

    if (jwt) {
      if (isAccessTokenExpired()) {
        jwt = await refreshToken();
      }
    }

    return jwt ? jwt.accessToken : "";
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

  useEffect(() => {
    if (!timerId.current) {
      void refreshToken();
    }
    return () => window.clearTimeout(timerId.current);
  }, [timerId.current]);

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
