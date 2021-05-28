import React, {PropsWithChildren, ReactElement} from "react";

import {history} from "@trejgun/history";

import {ApiContext, IAuth, IFetchProps} from "./context";
import {fetchRaw, fetchFile, fetchJson} from "./fetch";

const STORAGE_NAME = "jwt";

interface IApiProviderProps {}

export const ApiProvider = <T extends IAuth>(props: PropsWithChildren<IApiProviderProps>): ReactElement | null => {
  const {children} = props;

  const read = (key: string): T | null => {
    const auth = localStorage.getItem(key);
    return auth ? (JSON.parse(auth) as T) : null;
  };

  const save = (key: string, jwt: T | null): void => {
    const json = JSON.stringify(jwt);
    localStorage.setItem(key, json);
  };

  const setToken = (jwt: T | null): void => {
    return save(STORAGE_NAME, jwt);
  };

  const getToken = (): T | null => {
    return read(STORAGE_NAME);
  };

  const getAuthToken = async () => {
    let jwt = getToken();

    if (jwt) {
      if (jwt.accessTokenExpiresAt < new Date().getTime()) {
        if (jwt.refreshTokenExpiresAt! < new Date().getTime()) {
          history.push("/login");
          setToken(null);
          throw Object.assign(new Error("unauthorized"), {status: 401});
        }

        jwt = await fetchJson(`${process.env.BE_URL}/auth/refresh`, {
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
          .then((json: T) => {
            setToken(json);
            return json;
          })
          .catch(e => {
            console.error(e);
            setToken(null);
            return null;
          });
      }
    }

    return jwt ? jwt.accessToken : "";
  };

  const prepare = (fetch: (input: RequestInfo, init?: RequestInit) => Promise<any>) => async (
    props: IFetchProps,
  ): Promise<any> => {
    const {url, method = "GET", data = {}} = props;
    const newUrl = new URL(`${process.env.BE_URL}${url}`);
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
            newUrl.searchParams.append(key, data[key]);
          }
        });
      }
    }

    return fetch(newUrl.toString(), {
      headers: headers,
      credentials: "include",
      mode: "cors",
      method,
      body: hasData ? (data instanceof FormData ? data : JSON.stringify(data)) : void 0,
    });
  };

  return (
    <ApiContext.Provider
      value={{
        fetch: prepare(fetchRaw),
        fetchJson: prepare(fetchJson),
        fetchFile: prepare(fetchFile),
        setToken,
        getToken,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
