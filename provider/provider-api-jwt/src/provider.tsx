import { FC, PropsWithChildren } from "react";

import { history } from "@gemunion/history";
import { IJwt } from "@gemunion/types-jwt";
import {
  ApiProvider,
  IApiProviderProps,
  fetchJson,
  isAccessTokenExpired,
  isRefreshTokenExpired,
  getToken,
  setToken,
} from "@gemunion/provider-api";

export const ApiProviderJwt: FC<PropsWithChildren<IApiProviderProps>> = props => {
  const { baseUrl, storageName, children } = props;

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
