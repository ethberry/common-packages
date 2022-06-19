import { IJwt } from "@gemunion/types-jwt";
import { IFetchProps } from "./context";
import { stringify } from "qs";

export let baseUrl = "";
export let storageName = "jwt";

export const setBaseUrl = (url: string): void => void (baseUrl = url);
export const setStorageName = (key: string): void => void (storageName = key);
export const getBaseUrl = (): string => baseUrl;
export const getStorageName = (): string => storageName;

export const read = (): IJwt | null => {
  const jwt = localStorage.getItem(storageName);
  return jwt && jwt !== "null" && jwt !== "undefined" ? (JSON.parse(jwt) as IJwt) : null;
};

export const save = (jwt: IJwt | null): void => {
  const json = JSON.stringify(jwt);
  localStorage.setItem(getStorageName(), json);
};

export const getToken = (): IJwt | null => read();
export const setToken = (jwt: IJwt | null): void => save(jwt);

export const isAccessTokenExpired = (): boolean => {
  const jwt = getToken();

  return !!jwt && jwt.accessTokenExpiresAt < Date.now();
};

export const isRefreshTokenExpired = (): boolean => {
  const jwt = getToken();

  return !!jwt && jwt.refreshTokenExpiresAt < Date.now();
};

interface IPrepareProps {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<any>;
  getAuthToken: () => Promise<string>;
}

export const prepare = (props: IPrepareProps) => {
  const { fetch, getAuthToken } = props;

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

    const newUrl = new URL(`${getBaseUrl()}${url}${queryString}`);

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
