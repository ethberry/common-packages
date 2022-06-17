import { IJwt } from "@gemunion/types-jwt";
import { IFetchProps } from "./context";
import { stringify } from "qs";

export const read = (key: string): IJwt | null => {
  const jwt = localStorage.getItem(key);
  return jwt && jwt !== "null" && jwt !== "undefined" ? (JSON.parse(jwt) as IJwt) : null;
};

export const save = (key: string, jwt: IJwt | null): void => {
  const json = JSON.stringify(jwt);
  localStorage.setItem(key, json);
};

export const setToken =
  (key: string) =>
  (jwt: IJwt | null): void => {
    save(key, jwt);
  };

export const getToken = (key: string) => (): IJwt | null => {
  return read(key);
};

export const isAccessTokenExpired = (key: string) => (): boolean => {
  const jwt = getToken(key)();

  return !!jwt && jwt.accessTokenExpiresAt < Date.now();
};

export const isRefreshTokenExpired = (key: string) => (): boolean => {
  const jwt = getToken(key)();

  return !!jwt && jwt.refreshTokenExpiresAt < Date.now();
};

interface IPrepareProps {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<any>;
  getAuthToken: () => Promise<string>;
  baseUrl: string;
}

export const prepare = (props: IPrepareProps) => {
  const { fetch, baseUrl, getAuthToken } = props;
  return async (props: IFetchProps): Promise<any> => {
    const { url, method = "GET", data = {}, signal } = props;
    const token = await getAuthToken();
    let queryString = "";
    const hasData = method === "POST" || method === "PUT" || method === "PATCH";
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

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
};
