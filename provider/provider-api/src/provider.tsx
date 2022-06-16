import { Component } from "react";
import { stringify } from "qs";

import { IJwt } from "@gemunion/types-jwt";

import { ApiContext, IFetchProps } from "./context";
import { fetchFile, fetchJson } from "./fetch";

export interface IApiProviderProps {
  baseUrl: string;
  storageName?: string;
}

export abstract class ApiProvider extends Component<IApiProviderProps> {
  baseUrl: string;
  storageName: string;

  protected constructor(props: IApiProviderProps) {
    super(props);
    this.baseUrl = props.baseUrl;
    this.storageName = props.storageName || "jwt";
  }

  protected read(key: string): IJwt | null {
    const jwt = localStorage.getItem(key);
    return jwt && jwt !== "null" && jwt !== "undefined" ? (JSON.parse(jwt) as IJwt) : null;
  }

  protected save(key: string, jwt: IJwt | null): void {
    const json = JSON.stringify(jwt);
    localStorage.setItem(key, json);
  }

  setToken = (jwt: IJwt | null): void => {
    this.save(this.storageName, jwt);
  };

  getToken = (): IJwt | null => {
    return this.read(this.storageName);
  };

  isAccessTokenExpired = (): boolean => {
    const jwt = this.getToken();

    return !!jwt && jwt.accessTokenExpiresAt < Date.now();
  };

  isRefreshTokenExpired = (): boolean => {
    const jwt = this.getToken();

    return !!jwt && jwt.refreshTokenExpiresAt < Date.now();
  };

  abstract refreshToken(): Promise<any> | void;
  abstract getAuthToken(): Promise<string>;

  prepare(fetch: (input: RequestInfo, init?: RequestInit) => Promise<any>) {
    return async (props: IFetchProps): Promise<any> => {
      const { url, method = "GET", data = {}, signal } = props;
      let queryString = "";
      const hasData = method === "POST" || method === "PUT" || method === "PATCH";
      const headers = new Headers();
      headers.append("Accept", "application/json");
      headers.append("Authorization", `Bearer ${await this.getAuthToken()}`);

      if (!(data instanceof FormData)) {
        if (hasData) {
          headers.append("Content-Type", "application/json; charset=utf-8");
        } else {
          queryString = data ? `?${stringify(data)}` : "";
        }
      }

      const newUrl = new URL(`${this.baseUrl}${url}${queryString}`);

      return fetch(newUrl.toString(), {
        signal,
        headers,
        credentials: "include",
        mode: "cors",
        method,
        body: hasData ? (data instanceof FormData ? data : JSON.stringify(data)) : void 0,
      });
    };
  }

  render() {
    return (
      <ApiContext.Provider
        value={{
          fetchJson: this.prepare(fetchJson),
          fetchFile: this.prepare(fetchFile),
          setToken: this.setToken,
          getToken: this.getToken,
          isAccessTokenExpired: this.isAccessTokenExpired,
          isRefreshTokenExpired: this.isRefreshTokenExpired,
          refreshToken: this.refreshToken.bind(this),
        }}
      >
        {this.props.children}
      </ApiContext.Provider>
    );
  }
}
