import { history } from "@gemunion/history";
import {
  ApiProvider,
  IApiProviderProps,
  fetchJson,
  getToken as getTokenCallback,
  setToken as setTokenCallback,
  isAccessTokenExpired as isAccessTokenExpiredCallback,
  isRefreshTokenExpired as isRefreshTokenExpiredCallback,
} from "@gemunion/provider-api";
import { IJwt } from "@gemunion/types-jwt";
import { FC } from "react";

export const JwtApiProvider: FC<IApiProviderProps> = props => {
  const { baseUrl, storageName = "jwt" } = props;

  const getToken = getTokenCallback(storageName);
  const setToken = setTokenCallback(storageName);
  const isAccessTokenExpired = isAccessTokenExpiredCallback(storageName);
  const isRefreshTokenExpired = isRefreshTokenExpiredCallback(storageName);

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
    <ApiProvider baseUrl={baseUrl} refreshToken={refreshToken} getAuthToken={getAuthToken}>
      {props.children}
    </ApiProvider>
  );
};
