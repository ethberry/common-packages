import { FC, PropsWithChildren } from "react";

import { history } from "@ethberry/history";
import { IJwt } from "@ethberry/types-jwt";
import {
  ApiProvider,
  IApiProviderProps,
  useFetchJson,
  isAccessTokenExpired,
  isRefreshTokenExpired,
  getToken,
  setToken,
} from "@ethberry/provider-api";

export const ApiProviderJwt: FC<PropsWithChildren<IApiProviderProps>> = props => {
  const { baseUrl, storageName, children } = props;
  const { fetchJson } = useFetchJson();

  const refreshToken = async () => {
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

    return null;
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

  return (
    <ApiProvider baseUrl={baseUrl} storageName={storageName} refreshToken={refreshToken} getAuthToken={getAuthToken}>
      {children}
    </ApiProvider>
  );
};
